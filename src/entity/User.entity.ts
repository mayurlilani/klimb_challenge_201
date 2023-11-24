import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { GameSession } from './GameSession.entity';
import { Redemption } from './Redemption.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  balance: number;

  @OneToMany(() => GameSession, (gameSession) => gameSession.user)
  gameSessions: GameSession[];

  @OneToMany(() => Redemption, (redemption) => redemption.user)
  redemptions: Redemption[];
}
