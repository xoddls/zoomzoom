import { Controller, Get, Post, Body, Query, } from '@nestjs/common';
import { dateHolidayRule, dayHolidayRule, monthHolidayRule, weekHolidayRule } from 'src/common/enum';
import { AddHolidayDto, AddHolidayRes, AddHolidayRuleDto, RuleDto, RuleRes } from './dto/holiday.dto';
import { HolidayService } from './holiday.service';

@Controller()
export class HolidayController {
  constructor(private readonly holidayService: HolidayService) { }

  @Post('holiday')
  async addHoliday(
    @Body() addHolidayDto: AddHolidayDto
  ): Promise<AddHolidayRes | string> {
    const result = await this.holidayService.addHoliday(addHolidayDto);
    return result;
  }

  @Post('rule')
  async addHolidayRule(
    @Body() ruleDto: RuleDto
  ): Promise<RuleRes> {
    return await this.holidayService.addHolidayRule(ruleDto);
  }

  @Post('holidayRule')
  async addHolidayByRule(
    @Body() addHolidayRuleDto: AddHolidayRuleDto
  ): Promise<string[] | string> {
    const temp = await this.holidayService.addHolidayByRule(addHolidayRuleDto);
    return temp;
  }
}
