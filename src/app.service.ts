import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/User.entity';
import { Repository } from 'typeorm';
import { GameSession } from './entity/GameSession.entity';
import { GameSessionDTO } from './dtos/gameSession.dto';
import { RedemptionDTO } from './dtos/redemption.dto';
import { Redemption } from './entity/Redemption.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(GameSession)
    private gameSessionRepository: Repository<GameSession>,
    @InjectRepository(Redemption)
    private redemptionRepository: Repository<Redemption>,
  ) {}

  async getUserBalance(id: number): Promise<{ balance: number }> {
    const user = await this.userRepository.findOne({
      where: { id },
      select: ['balance'],
    });
    return { balance: user.balance };
  }

  async createGameSession(
    gameSession: GameSessionDTO,
  ): Promise<{ message: string; newBalance: number }> {
    const user = await this.userRepository.findOne({
      where: { id: gameSession.userId },
    });
    if (user.balance <= gameSession.amountPlayed) {
      throw new BadRequestException('Insufficient balance.');
    }
    user.balance -= gameSession.amountPlayed;
    const newGameSession = new GameSession();
    newGameSession.userId = gameSession.userId;
    newGameSession.amountPlayed = gameSession.amountPlayed;
    await this.gameSessionRepository.save(newGameSession);
    await this.userRepository.update(
      { id: gameSession.userId },
      { balance: user.balance },
    );
    return {
      message: 'Game session recorded successfully.',
      newBalance: user.balance,
    };
  }

  async createRedemption(
    redemption: RedemptionDTO,
  ): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({
      where: { id: redemption.userId },
    });
    if (!user) {
      throw new NotFoundException(
        `User with ID ${redemption.userId} not found`,
      );
    }
    const redemptionRequest = new Redemption();
    redemptionRequest.userId = redemption.userId;
    redemptionRequest.amount = redemption.amount;
    redemptionRequest.status = 'requested';
    await this.redemptionRepository.save(redemptionRequest);
    return { message: 'Redemption requested.' };
  }

  async getRedemptions(id: number): Promise<{ redemptions: any[] }> {
    const redemptions = await this.redemptionRepository.find({
      where: { userId: id },
    });
    return { redemptions };
  }
}
