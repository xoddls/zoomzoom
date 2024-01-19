import { Module } from "@nestjs/common";
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from "./auth.service";
import { ConfigService } from '@nestjs/config';


@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRETKEY'),
      }),
    }),
  ],
  controllers: [],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule { }