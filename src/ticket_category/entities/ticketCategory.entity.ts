import { EventEntity } from '../../event_entity/entities/eventEntity.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity('ticket_category')
export class TicketCategory {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'varchar', length: 100 })
  description: string;

  @Column({ type: 'integer', name: 'available_tickets' })
  availableTickets: number;

  @Column({ type: 'date', name: 'start_day' })
  startDay: Date;

  @Column({ type: 'date', name: 'end_date', nullable: true })
  endDate: Date;

  @ManyToOne(() => EventEntity)
  @JoinColumn({ name: 'event_id' })
  event: EventEntity;
}
