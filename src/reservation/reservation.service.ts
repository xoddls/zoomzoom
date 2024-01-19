import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { Cache } from 'cache-manager';
import { HolidayService } from "src/holiday/holiday.service";
import { AuthService } from "src/auth/auth.service";
import { Reservation } from "./entities/reservation.entity";
import { CancleReservation } from "./entities/cancleReservation.entity";
import { JwtPayloadDto } from "src/auth/dto/auth.dto";
import { reservationDto } from "./dto/reservation.dto";


@Injectable()
export class ReservationService {

  constructor(
    private dataSource: DataSource,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly holidayService: HolidayService,
    private readonly authService: AuthService
  ) { }

  async getMonthlyAvailablity(year: number, month: number): Promise<string[]> {
    let cacheKey
    if (month < 10) {
      cacheKey = `${year}-0${month}`;
    } else {
      cacheKey = `${year}-${month}`;
    }
    let holiday;
    if (await this.cacheManager.get(cacheKey)) {
      holiday = await this.cacheManager.get(cacheKey)
    } else {
      holiday = await this.holidayService.getHoliday(year, month);
      await this.cacheManager.set(cacheKey, holiday, { ttl: 3600 });
    }

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    const availabeDate: Date[] = [];

    while (startDate <= endDate) {
      availabeDate.push(new Date(startDate));
      startDate.setDate(startDate.getDate() + 1);
    }

    const result: string[] = [];
    availabeDate.map(e => {
      const year = e.getFullYear().toString();
      const month = (e.getMonth() + 1).toString().padStart(2, '0');
      const day = e.getDate().toString().padStart(2, '0');
      const formatDate = `${year}-${month}-${day}`;
      if (!holiday.includes(formatDate)) {
        result.push(formatDate);
      }
    });

    return result;
  }

  async autoApproveReservation(
    reservation: reservationDto
  ): Promise<string | null> {
    const userId = reservation.userId;
    const date = reservation.date;

    const result = await this.dataSource.transaction(async t => {
      const reservation = await t.getRepository(Reservation)
        .createQueryBuilder('reservation')
        .where('reservation.date = :date', { date: date })
        .getMany();

      if (reservation.length >= 5) {
        return 'Five reservations that can be automatically approved have already';
      } else {
        const approveReservation = await t.save(Reservation, {
          userId: userId,
          date: date
        });

        const jwtPayload: JwtPayloadDto = {
          reservationId: approveReservation.id,
          userId: approveReservation.userId,
          date: approveReservation.date
        }

        const token = this.authService.generateToken(jwtPayload);
        return token;
      }
    });
    return result;
  }

  async cancleReservation(reservationId: number): Promise<string> {
    const result = await this.dataSource.transaction(async t => {
      const reservation = await t.getRepository(Reservation)
        .createQueryBuilder('reservation')
        .where('reservation.id = :reservationId', { reservationId: reservationId })
        .getOne();

      if (reservation) {
        let now = new Date();
        now.setDate(now.getDate() + 3);
        now.setUTCHours(0, 0, 0, 0,);
        let reservationDate = new Date(reservation!.date);
        if (now > reservationDate) {
          return 'Cancellation is not possible within 3 days of reservation'
        } else {
          await t.save(CancleReservation, {
            userId: reservation.userId,
            date: reservation.date
          })
          await t.delete(Reservation, {
            id: reservationId
          })
          return "Reservation cancellation completed";
        }
      } else {
        const cancleReservation = await t.getRepository(CancleReservation)
          .createQueryBuilder('cancleReservation')
          .where('cancleReservation.id = :reservationId', { reservationId: reservationId })
          .getOne();
        if (cancleReservation) {
          return 'Reservation already canceled';
        } else {
          return 'Non-existent reservation';
        }
      }
    });
    return result;
  }

  async addApproveReservation(
    reservation: reservationDto
  ): Promise<string> {
    const userId = reservation.userId;
    const date = reservation.date;

    const result = await this.dataSource.transaction(async t => {
      const approveReservation = await t.save(Reservation, {
        userId: userId,
        date: date
      });

      const jwtPayload: JwtPayloadDto = {
        reservationId: approveReservation.id,
        userId: approveReservation.userId,
        date: approveReservation.date
      }

      const token = this.authService.generateToken(jwtPayload);
      return token;
    });
    return result;
  }

  async getReservation(token: string): Promise<JwtPayloadDto> {
    const decode = await this.authService.verifyToken(token);
    return {
      reservationId: decode.reservationId,
      userId: decode.userId,
      date: decode.date
    }
  }
}