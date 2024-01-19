import { IsNumber, IsString } from "class-validator";

export class reservationDto {
  @IsNumber()
  userId!: number

  @IsString()
  date!: string;
}