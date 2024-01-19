import { IsDateString, isNumber, IsNumber, IsString } from "class-validator";

export class AddHolidayDto {
  @IsDateString()
  holidayDate!: string;
}

export class AddHolidayRes extends AddHolidayDto {
  @IsNumber()
  id!: number;
}

export class RuleDto {
  @IsString()
  month!: string;

  @IsString()
  week!: string;

  @IsString()
  date!: string;

  @IsString()
  day!: string;
}

export class RuleRes extends RuleDto {
  @IsNumber()
  id!: number;
}

export class AddHolidayRuleDto {
  @IsNumber()
  ruleId!: string;
}