import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { TicketCategory } from '../../ticket_category/entities/ticketCategory.entity';
import { Transaction } from '../../transaction/entities/transaction.entity';

@Entity('ticket')
export class Ticket {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ type: 'varchar', length: 300, name: 'qr_code', nullable: true })
  qrCode: string;
  @Column({ type: 'varchar', length: 20, default: 'PENDING' })
  state: string;

  @Column({ type: 'timestamp', name: 'use_date', nullable: true })
  useDate: Date;

  @ManyToOne(() => TicketCategory)
  @JoinColumn({ name: 'ticket_category_id' })
  ticketCategory: TicketCategory;

  @ManyToOne(() => Transaction)
  @JoinColumn({ name: 'transaction_id' })
  transaction: Transaction;
}
