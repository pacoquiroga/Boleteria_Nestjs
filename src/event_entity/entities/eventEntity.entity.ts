import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity('event_entity')
export class EventEntity {
  @PrimaryGeneratedColumn({ name: 'id_event' })
  idEvent: number;

  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'time' })
  hour: string;

  @Column({ type: 'varchar', length: 50 })
  location: string;

  @Column({ type: 'varchar', length: 50 })
  city: string;

  @Column({ type: 'varchar', length: 100 })
  description: string;

  @Column({ type: 'integer' })
  capacity: number;

  @Column({ type: 'varchar', length: 20 })
  state: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'id_user' })
  user: User;
}
