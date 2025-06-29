import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { CreateTransactionTicketRequestDto } from './dto/create-transaction_ticket_request.dto';
import { UpdateTransactionTicketRequestDto } from './dto/update-transaction_ticket_request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionTicketRequest } from './entities/transaction_ticket_request.entity';
import { Repository } from 'typeorm';
import { TransactionService } from '../transaction/transaction.service';
import { TicketCategoryService } from '../ticket_category/ticketCategory.service';
import { TicketService } from 'src/ticket/ticket.service';
import { Ticket } from 'src/ticket/entities/ticket.entity';

@Injectable()
export class TransactionTicketRequestService {
  constructor(
    @InjectRepository(TransactionTicketRequest)
    private readonly transactionTicketRequestRepository: Repository<TransactionTicketRequest>,
    @Inject(forwardRef(() => TransactionService))
    private readonly transactionService: TransactionService,
    private readonly ticketCategoryService: TicketCategoryService,
    @Inject(forwardRef(() => TicketService))
    private readonly ticketService: TicketService,
  ) {}

  async create(
    createTransactionTicketRequestDto: CreateTransactionTicketRequestDto,
  ) {
    try {
      const savedTicketRequests: TransactionTicketRequest[] = [];

      const transaction = await this.transactionService.findOne(
        createTransactionTicketRequestDto.idTransaction,
      );

      if (!transaction) {
        throw new Error('Transaction not found');
      }

      for (const request of createTransactionTicketRequestDto.ticketCategoryRequests) {
        const ticketCategory = await this.ticketCategoryService.findOne(
          request.ticketCategoryId,
        );

        if (!ticketCategory) {
          throw new Error(
            `Ticket category with ID ${request.ticketCategoryId} not found`,
          );
        }

        const newTicketRequest = this.transactionTicketRequestRepository.create(
          {
            quantity: request.quantity,
            transaction: transaction,
            ticketCategory: ticketCategory,
          },
        );

        const savedTicketRequest =
          await this.transactionTicketRequestRepository.save(newTicketRequest);
        savedTicketRequests.push(savedTicketRequest);
      }

      return savedTicketRequests;
    } catch (error) {
      console.error('Error creating transaction ticket requests:', error);
      throw error;
    }
  }

  findAll() {
    return `This action returns all transactionTicketRequest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transactionTicketRequest`;
  }

  update(
    id: number,
    updateTransactionTicketRequestDto: UpdateTransactionTicketRequestDto,
  ) {
    return `This action updates a #${id} transactionTicketRequest`;
  }

  remove(id: number) {
    return `This action removes a #${id} transactionTicketRequest`;
  }

  async createTickets(transactionId: number) {
    try {
      const transaction = await this.transactionService.findOne(transactionId);
      if (!transaction) {
        throw new Error('Transaction not found');
      }

      const ticketRequests = await this.transactionTicketRequestRepository.find(
        {
          where: { transaction: { id: transactionId } },
          relations: ['ticketCategory'],
        },
      );

      if (!ticketRequests || ticketRequests.length === 0) {
        throw new Error('No ticket requests found for this transaction');
      }
      console.log('Ticket requests found:', ticketRequests);

      // Crear un array de promesas para todos los tickets
      const ticketPromises: Promise<Ticket>[] = [];

      for (const request of ticketRequests) {
        // Crear tantos tickets como indique la quantity
        for (let i = 0; i < request.quantity; i++) {
          const ticketPromise = this.ticketService.create({
            ticketCategoryId: request.ticketCategory.id,
            transactionId: transaction.id,
          });
          ticketPromises.push(ticketPromise);
        }
      }

      // Ejecutar todas las promesas de creación de tickets
      const createdTickets = await Promise.all(ticketPromises);

      console.log(
        `Successfully created ${createdTickets.length} tickets for transaction ${transactionId}`,
      );

      return createdTickets;
    } catch (error) {
      console.error('Error creating tickets:', error);
      throw error;
    }
  }
}
