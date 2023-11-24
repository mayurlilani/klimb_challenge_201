import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Redemption } from '../entity/Redemption.entity';
import { User } from '../entity/User.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Redemption)
    private redemptionRepository: Repository<Redemption>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  // run scheduler every 30 seconds
  @Cron('*/30 * * * * *')
  async processRedemption() {
    console.log('Processing redemptions...');
    const redemptions = await this.redemptionRepository.find({
      where: { status: 'requested' },
    });
    for (const redemption of redemptions) {
      const user = await this.userRepository.findOne({
        where: { id: redemption.userId },
      });
      user.balance += redemption.amount;
      redemption.status = 'processed';
      await this.userRepository.save(user);
      await this.redemptionRepository.save(redemption);
    }
  }
}
