import { EventEntity } from 'src/event_entity/entities/eventEntity.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity('transaction')
export class Transaction {
  @PrimaryGeneratedColumn({ name: 'id_transaction' })
  idTransaction: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'total_amount' })
  totalAmount: number;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'varchar', length: 20 })
  state: string;

  @Column({ type: 'varchar', length: 30, name: 'payment_method' })
  paymentMethod: string;

  @ManyToOne(() => EventEntity)
  @JoinColumn({ name: 'id_event' })
  event: EventEntity;
}
