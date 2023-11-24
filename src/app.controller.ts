import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { GameSessionDTO } from './dtos/gameSession.dto';
import { RedemptionDTO } from './dtos/redemption.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/users/:id/balance')
  async getHello(@Param() param): Promise<{ balance: number }> {
    return await this.appService.getUserBalance(param.id);
  }

  @Post('game-sessions')
  async createGameSession(
    @Body(new ValidationPipe()) gameSession: GameSessionDTO,
  ): Promise<{ message: string; newBalance: number }> {
    return await this.appService.createGameSession(gameSession);
  }

  @Post('redemptions')
  async createRedemptionRequest(
    @Body(new ValidationPipe()) redemption: RedemptionDTO,
  ): Promise<{ message: string }> {
    return await this.appService.createRedemption(redemption);
  }

  @Get('/users/:id/redemptions')
  async getRedemptions(@Param() param): Promise<{ redemptions: any[] }> {
    return await this.appService.getRedemptions(param.id);
  }
}
