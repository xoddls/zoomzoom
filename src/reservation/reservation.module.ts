import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import * as redisStore from 'cache-manager-ioredis';
import { HolidayModule } from 'src/holiday/holiday.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reservation]),
    HolidayModule,
    AuthModule,
    CacheModule.register({
      store: redisStore,
      host: 'localhost',
      port: 6379,
    })
  ],
  controllers: [ReservationController],
  providers: [
    ReservationService,
  ]
})
export class ReservationModule { }
