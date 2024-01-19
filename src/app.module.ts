import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserEntity } from './user/entities/user.entity';
import { connectionOptions } from './ormconfig';
import { ReservationModule } from './reservation/reservation.module';
import { HolidayModule } from './holiday/holiday.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(connectionOptions),
    ReservationModule,
    HolidayModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }