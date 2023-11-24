import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/User.entity';
import { GameSession } from './entity/GameSession.entity';
import { Redemption } from './entity/Redemption.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from './task/task.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'klimb_challenge_201',
      entities: [User, GameSession, Redemption],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, GameSession, Redemption]),
    ScheduleModule.forRoot(),
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
