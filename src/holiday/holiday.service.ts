import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, EntityManager, Repository } from "typeorm";
import { AddHolidayDto, AddHolidayRes, AddHolidayRuleDto, RuleDto, RuleRes } from "./dto/holiday.dto";
import { Holiday } from "./entities/holiday.entity";
import { dateHolidayRule, dayHolidayRule, monthHolidayRule, weekHolidayRule } from "src/common/enum";
import { HolidayRule } from "./entities/holidayRule.entity";
import { Cache } from 'cache-manager';
import { Cron } from "@nestjs/schedule";

@Injectable()
export class HolidayService {

  constructor(
    @InjectRepository(Holiday) private holidayRepo: Repository<Holiday>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,

    private dataSource: DataSource
  ) { }

  async addHoliday(
    addHolidayDto: AddHolidayDto
  ): Promise<AddHolidayRes | string> {
    const result = await this.dataSource.transaction(async t => {
      const exists = await t.getRepository(Holiday)
        .findOneBy({ holidayDate: addHolidayDto.holidayDate });
      if (exists) {
        return 'this date is already a holiday.';
      } else {
        await this.updateRedis(t, addHolidayDto.holidayDate);
        return await t.save(Holiday, {
          holidayDate: addHolidayDto.holidayDate
        });
      }
    });
    return result;
  }

  async addHolidayRule(
    ruleDto: RuleDto
  ): Promise<RuleRes> {
    const month = monthHolidayRule[ruleDto.month];
    const week = weekHolidayRule[ruleDto.week];
    const date = dateHolidayRule[ruleDto.date];
    const day = dayHolidayRule[ruleDto.day];

    const result = await this.dataSource.transaction(async t => {
      let holiday: RuleRes = await t.save(HolidayRule, {
        month: month,
        week: week,
        date: date,
        day: day
      });
      return holiday;
    });
    return result;
  }

  async addHolidayByRule(
    addHolidayRuleDto: AddHolidayRuleDto
  ): Promise<string[] | string> {
    const rule = await this.dataSource.getRepository(HolidayRule)
      .findOne({
        where: {
          id: Number(addHolidayRuleDto.ruleId)
        },
      })

    let month;
    let week;
    let date;
    let day;
    if (rule) {
      month = rule.month;
      week = rule.week
      date = rule.date
      day = rule.day
    } else {
      return 'there is no rule corresponding to ruleId.'
    }
    let startDate = new Date();
    startDate.setUTCHours(0, 0, 0, 0);
    let endDate = new Date(startDate);
    endDate.setFullYear(endDate.getFullYear() + 1);
    const holiday: Date[] = [];

    const result: string[] = []
    while (startDate < endDate) {
      startDate.setDate(startDate.getDate() + 1);

      const getMonth = startDate.getMonth() + 1;
      const getWeek = getWeekNumber(startDate);
      const getDate = startDate.getDate();
      const getDay = startDate.getDay();

      if (month <= 12) {
        if (getMonth != month) continue;
      } else if (month == 13) {
        //skip
      }
      else if (month == 14) {
        if (getMonth % 2 != 0) continue;
      } else {
        if (getMonth % 2 == 0) continue;
      }

      if (week <= 6) {
        if (getWeek != week) continue;
      }

      if (date <= 31) {
        if (getDate != date) continue;
      } else if (date == 32) {
      } else if (date == 33) {
        if ((getDate % 2) != 0) continue;
      } else {
        if (getDate % 2 == 0) continue;
      }

      if (day <= 6) {
        if (getDay != day) continue;
      }

      const formatYear = startDate.getFullYear().toString();
      const formatMonth = (startDate.getMonth() + 1).toString().padStart(2, '0');
      const formatDay = startDate.getDate().toString().padStart(2, '0');
      const format = `${formatYear}-${formatMonth}-${formatDay}`;
      result.push(format);
    }

    await this.dataSource.transaction(async t => {
      for await (const r of result) {
        const exist = await t.getRepository(Holiday)
          .findOneBy({ holidayDate: r })
        if (!exist) {
          await t.save(Holiday, { holidayDate: r });
          await this.updateRedis(t, r);
        }
      }
    });
    return result;
  }

  @Cron('0 0 0 * * *', { timeZone: 'Asia/Seoul' })
  async autoAddHolidayByRuule(): Promise<void> {
    const now = new Date();
    const getYear = now.getFullYear();
    const getMonth = now.getMonth() + 1;
    const getWeek = getWeekNumber(now);
    const getDate = now.getDate();
    const getDay = now.getDay();

    const rule = await this.dataSource.getRepository(HolidayRule).find();
    if (rule.length) {
      const result: string[] = []
      for (const r of rule) {
        if (r.month <= 12) {
          if (getMonth != r.month) continue;
        } else if (r.month == 13) {
          //skip
        }
        else if (r.month == 14) {
          if (getMonth % 2 != 0) continue;
        } else {
          if (getMonth % 2 == 0) continue;
        }

        if (r.week <= 6) {
          if (getWeek != r.week) continue;
        }

        if (r.date <= 31) {
          if (getDate != r.date) continue;
        } else if (r.date == 32) {
        } else if (r.date == 33) {
          if ((getDate % 2) != 0) continue;
        } else {
          if (getDate % 2 == 0) continue;
        }

        if (r.day <= 6) {
          if (getDay != r.day) continue;
        }
        result.push(`${getYear}-${getMonth}-${getDate}`);
      }

      await this.dataSource.transaction(async t => {
        for await (const r of result) {
          const exist = await t.getRepository(Holiday)
            .findOneBy({ holidayDate: r })
          if (!exist) {
            await t.save(Holiday, { holidayDate: r });
            await this.updateRedis(t, r);
          }
        }
      });
    } else {
      return;
    }
  }

  async updateRedis(t: EntityManager, date: string): Promise<void> {
    const cacheKey = date.substring(0, 7);
    let holiday: string[] | undefined = await this.cacheManager.get(cacheKey);
    if (holiday && !holiday.includes(date)) {
      holiday.push(date);
      await this.cacheManager.set(cacheKey, holiday, { ttl: 3600 });
    }
    return;
  }

  async getHoliday(year: number, month: number): Promise<string[]> {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    const holiday = await this.holidayRepo
      .createQueryBuilder('holiday')
      .where('holiday.holidayDate >= :startDate', { startDate })
      .andWhere('holiday.holidayDate <= :endDate', { endDate })
      .getMany();
    const HolidayDto = holiday.map(h => {
      return h.holidayDate;
    }
    )
    return HolidayDto;
  }
}

function getWeekNumber(date: Date): number {
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const firstDayOfWeek = firstDayOfMonth.getDay();
  const firstWeekStart = firstDayOfMonth.getDate() - firstDayOfWeek;
  const currentDate = date.getDate();
  const weekNumber = Math.ceil((currentDate - firstWeekStart) / 7);
  return weekNumber;
}