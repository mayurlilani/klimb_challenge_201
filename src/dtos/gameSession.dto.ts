import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class GameSessionDTO {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  amountPlayed: number;
}
