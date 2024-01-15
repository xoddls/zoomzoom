import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SellerService } from './seller.service';

@Controller('seller')
export class SellerController {
  constructor(private readonly sellerService: SellerService) { }

  @Post()
  create() {
    return this.sellerService.create();
  }

  @Get()
  findAll() {
    return this.sellerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sellerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.sellerService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sellerService.remove(+id);
  }
}
