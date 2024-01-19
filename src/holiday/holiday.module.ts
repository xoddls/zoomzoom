import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HolidayController } from './holiday.controller';
import { Holiday } from './entities/holiday.entity';
import { HolidayService } from './holiday.service';
import * as redisStore from 'cache-manager-ioredis';
import { ScheduleModule } from '@nestjs/schedule';


@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([Holiday]),
    CacheModule.register({
      store: redisStore,
      host: 'localhost',
      port: 6379,
    })
  ],
  controllers: [HolidayController],
  providers: [HolidayService],
  exports: [HolidayService]
})
export class HolidayModule { }
