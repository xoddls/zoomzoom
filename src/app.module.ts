import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TourModule } from './tour/tour.module';
import { UserModule } from './user/user.module';
import { SellerModule } from './seller/seller.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/entities/user.entity';
import { connectionOptions } from './ormconfig';
import { TourEntity } from './tour/entities/tour.entity';
import { SellerEntity } from './seller/entities/seller.entity';



@Module({
  imports: [
    TypeOrmModule.forRoot(connectionOptions),
    TypeOrmModule.forFeature([
      UserEntity,
      TourEntity,
      SellerEntity
    ]),
    TourModule,
    UserModule,
    SellerModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }