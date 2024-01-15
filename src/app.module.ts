import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TourModule } from './tour/tour.module';
import { UserModule } from './user/user.module';
import { SellerModule } from './seller/seller.module';

@Module({
  imports: [TourModule, UserModule, SellerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
