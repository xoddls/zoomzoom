import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TourService } from './tour.service';

@Controller()
export class TourController {
  constructor(private readonly tourService: TourService) { }

  @Get('tour/:userId')
  async autoApproveReservations(
    @Param('userId') userId: number,
    @Query('date') date: Date,
  ) {
    return this.tourService.autoApproveReservations(userId, date);
  }
}
