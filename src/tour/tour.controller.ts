import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TourService } from './tour.service';

@Controller('tour')
export class TourController {
  constructor(private readonly tourService: TourService) { }

  @Post()
  create() {
    return this.tourService.create();
  }

  @Get()
  findAll() {
    return this.tourService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tourService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.tourService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tourService.remove(+id);
  }
}
