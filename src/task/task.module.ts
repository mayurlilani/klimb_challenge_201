import { Module } from '@nestjs/common';
import { Redemption } from '../entity/Redemption.entity';
import { TasksService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entity/User.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Redemption, User])],
  providers: [TasksService],
  exports: [TasksService],
})
export class TasksModule {}
