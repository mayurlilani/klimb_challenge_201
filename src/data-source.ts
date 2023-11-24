import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entity/User.entity';
import { GameSession } from './entity/GameSession.entity';
import { Redemption } from './entity/Redemption.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postres',
  database: 'klimb_challenge_201',
  entities: [User, GameSession, Redemption],
  synchronize: true,
  logging: false,
});
