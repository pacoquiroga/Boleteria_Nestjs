import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { EventEntityService } from 'src/event_entity/eventEntity.service';
import { TransactionTicketRequestService } from 'src/transaction_ticket_request/transaction_ticket_request.service';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    private readonly eventService: EventEntityService,
    @Inject(forwardRef(() => TransactionTicketRequestService))
    private readonly transactionTicketRequestService: TransactionTicketRequestService,
  ) {}

  async create(createTransactionDto: CreateTransactionDto) {
    try {
      const existingEvent = await this.eventService.findOne(
        createTransactionDto.eventId,
      );

      if (!existingEvent) {
        throw new Error('Event not found');
      }
      const newTransaction = this.transactionRepository.create({
        totalAmount: createTransactionDto.totalAmount,
        purchaseDate: createTransactionDto.purchaseDate || new Date(),
        state: createTransactionDto.state || 'PENDING',
        paymentMethod: createTransactionDto.paymentMethod,
        ownerId: createTransactionDto.ownerId,
        ownerEmail: createTransactionDto.ownerEmail,
        ownerName: createTransactionDto.ownerName,
        ownerLastname: createTransactionDto.ownerLastname,
        ownerCi: createTransactionDto.ownerCi,
        event: existingEvent,
      });

      const savedTransaction =
        await this.transactionRepository.save(newTransaction);

      const transactionRequests =
        await this.transactionTicketRequestService.create({
          idTransaction: savedTransaction.id,
          ticketCategoryRequests: createTransactionDto.ticketCategoryRequests,
        });

      console.log('Transaction created successfully:', savedTransaction);
      console.log(
        'Transaction requests created successfully:',
        transactionRequests,
      );

      return savedTransaction;
    } catch (error) {
      console.error('Error creating transaction:', error);
      throw new Error('Failed to create transaction');
    }
  }

  findAll() {
    return `This action returns all transaction`;
  }
  async findOne(id: number) {
    try {
      const transaction = await this.transactionRepository.findOne({
        where: { id },
        relations: ['event'], // Incluye la relación con el evento
      });

      if (!transaction) {
        throw new Error(`Transaction with ID ${id} not found`);
      }

      return transaction;
    } catch (error) {
      console.error('Error finding transaction:', error);
      throw error;
    }
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
