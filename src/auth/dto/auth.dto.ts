import { IsDateString, IsNumber } from "class-validator";

export class JwtPayloadDto {
  @IsNumber()
  reservationId!: number;

  @IsNumber()
  userId!: number;

  @IsDateString()
  date!: string;
}