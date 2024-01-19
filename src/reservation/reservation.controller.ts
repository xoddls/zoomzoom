import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Request,
} from '@nestjs/common';
import { JwtPayloadDto } from 'src/auth/dto/auth.dto';
import { reservationDto } from './dto/reservation.dto';
import { ReservationService } from './reservation.service';

@Controller()
export class ReservationController {
  constructor(
    private readonly reservationService: ReservationService,
  ) { }

  @Get('monthlyAvailablity')
  async getMonthlyAvailablity(
    @Query('year') year: number,
    @Query('month') month: number
  ): Promise<string[]> {
    return await this.reservationService.getMonthlyAvailablity(year, month);
  }

  @Post('reservation')
  async autoApproveReservation(
    @Body() reservation: reservationDto,
  ): Promise<string | null> {
    return await this.reservationService.autoApproveReservation(reservation);
  }

  @Delete('reservation/:reservationId')
  async cancleReservation(
    @Param('reservationId') reservationId: number
  ): Promise<string> {
    return await this.reservationService.cancleReservation(reservationId);
  }

  @Post('additionalReservation')
  async addApproveReservation(
    @Body() reservation: reservationDto,
  ): Promise<string> {
    return await this.reservationService.addApproveReservation(reservation);
  }

  @Get('reservation')
  async getReservation(
    @Request() req
  ): Promise<JwtPayloadDto> {
    const token = req.headers.authorization;
    return await this.reservationService.getReservation(token);
  }
}
