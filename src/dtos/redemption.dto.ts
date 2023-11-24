import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class RedemptionDTO {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  amount: number;
}
