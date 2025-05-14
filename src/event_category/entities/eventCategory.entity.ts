import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('event_category')
export class EventCategory {
  @PrimaryGeneratedColumn({ name: 'id_event_category' })
  idEventCategory: number;

  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  description: string;
}
