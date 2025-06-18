import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Transaction } from '../../transaction/entities/transaction.entity';
import { TicketCategory } from '../../ticket_category/entities/ticketCategory.entity';

@Entity('transaction_ticket_request')
export class TransactionTicketRequest {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ type: 'integer' })
  quantity: number;

  @ManyToOne(() => Transaction)
  @JoinColumn({ name: 'id_transaction' })
  transaction: Transaction;

  @ManyToOne(() => TicketCategory)
  @JoinColumn({ name: 'id_ticket_category' })
  ticketCategory: TicketCategory;
}
