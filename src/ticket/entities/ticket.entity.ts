import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { TicketCategory } from '../../ticket_category/entities/ticketCategory.entity';
import { Transaction } from '../../transaction/entities/transaction.entity';

@Entity('ticket')
export class Ticket {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ type: 'varchar', length: 300, name: 'qr_code' })
    qrCode: string;

    @Column({ type: 'varchar', length: 20 })
    state: string;

    @Column({ type: 'timestamp', name: 'purchase_date' })
    purchaseDate: Date;

    @Column({ type: 'timestamp', name: 'use_date', nullable: true })
    useDate: Date;

    @Column({ type: 'integer', name: 'owner_id' })
    ownerId: number;

    @Column({ type: 'varchar', length: 100, name: 'owner_email' })
    ownerEmail: string;

    @Column({ type: 'varchar', length: 50, name: 'owner_name' })
    ownerName: string;

    @Column({ type: 'varchar', length: 50, name: 'owner_lastname' })
    ownerLastname: string;

    @Column({ type: 'varchar', length: 20, name: 'owner_ci' })
    ownerCi: string;

    @ManyToOne(() => TicketCategory)
    @JoinColumn({ name: 'ticket_category_id' })
    ticketCategory: TicketCategory;

    @ManyToOne(() => Transaction)
    @JoinColumn({ name: 'transaction_id' })
    transaction: Transaction;
}
