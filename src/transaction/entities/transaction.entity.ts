import { EventEntity } from '../../event_entity/entities/eventEntity.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('transaction')
export class Transaction {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'total_amount' })
  totalAmount: number;

  @Column({ type: 'varchar', length: 20 })
  state: string;

  @Column({ type: 'varchar', length: 30, name: 'payment_method' })
  paymentMethod: string;

  // Campos de información del comprador  @Column({ type: 'timestamp', name: 'purchase_date' })
  purchaseDate: Date;

  @Column({ type: 'integer', name: 'owner_id', nullable: true })
  ownerId?: number;

  @Column({ type: 'varchar', length: 100, name: 'owner_email' })
  ownerEmail: string;

  @Column({ type: 'varchar', length: 50, name: 'owner_name' })
  ownerName: string;

  @Column({ type: 'varchar', length: 50, name: 'owner_lastname' })
  ownerLastname: string;

  @Column({ type: 'varchar', length: 20, name: 'owner_ci' })
  ownerCi: string;

  @ManyToOne(() => EventEntity)
  @JoinColumn({ name: 'event_id' })
  event: EventEntity;
}
