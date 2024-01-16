import { Module } from '@nestjs/common';
import { TourModule } from './tour/tour.module';
import { UserModule } from './user/user.module';
import { SellerModule } from './seller/seller.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/entities/user.entity';
import { connectionOptions } from './ormconfig';
import { Tour } from './tour/entities/tour.entity';
import { SellerEntity } from './seller/entities/seller.entity';
import { TourController } from './tour/tour.controller';
import { UserController } from './user/user.controller';
import { SellerController } from './seller/seller.controller';
import { TourService } from './tour/tour.service';
import { UserService } from './user/user.service';
import { SellerService } from './seller/seller.service';



@Module({
  imports: [
    TypeOrmModule.forRoot(connectionOptions),
    TypeOrmModule.forFeature([
      UserEntity,
      Tour,
      SellerEntity
    ]),
    TourModule,
    UserModule,
    SellerModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }