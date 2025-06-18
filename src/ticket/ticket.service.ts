import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket } from './entities/ticket.entity';
import { TicketCategoryService } from '../ticket_category/ticketCategory.service';
import { TransactionService } from '../transaction/transaction.service';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    private readonly ticketCategoryService: TicketCategoryService,
    private readonly transactionService: TransactionService,
  ) {}

  async create(createTicketDto: CreateTicketDto) {
    try {
      const ticketCategory = await this.ticketCategoryService.findOne(
        createTicketDto.ticketCategoryId,
      );
      const transaction = await this.transactionService.findOne(
        createTicketDto.transactionId,
      );

      if (!ticketCategory) {
        throw new Error('Ticket category not found');
      }

      if (!transaction) {
        throw new Error('Transaction not found');
      }

      const newTicket = this.ticketRepository.create({
        qrCode: createTicketDto.qrCode,
        state: createTicketDto.state,
        useDate: createTicketDto.useDate,
        ticketCategory: ticketCategory,
        transaction: transaction,
      });

      return await this.ticketRepository.save(newTicket);
    } catch (error) {
      console.error('Error creating ticket:', error);
      throw new Error('Failed to create ticket');
    }
  }

  async findAll() {
    try {
      return await this.ticketRepository.find({
        relations: ['ticketCategory', 'transaction'],
      });
    } catch (error) {
      console.error('Error finding tickets:', error);
      throw new Error('Failed to retrieve tickets');
    }
  }

  async findOne(id: number) {
    try {
      const ticket = await this.ticketRepository.findOne({
        where: { id },
        relations: ['ticketCategory', 'transaction'],
      });

      if (!ticket) {
        throw new Error(`Ticket with ID ${id} not found`);
      }

      return ticket;
    } catch (error) {
      console.error('Error finding ticket:', error);
      throw error;
    }
  }

  async update(id: number, updateTicketDto: UpdateTicketDto) {
    try {
      const result = await this.ticketRepository.update(id, updateTicketDto);

      if (result.affected === 0) {
        throw new Error(`Ticket with ID ${id} not found`);
      }

      return await this.findOne(id);
    } catch (error) {
      console.error('Error updating ticket:', error);
      throw new Error('Failed to update ticket');
    }
  }

  async remove(id: number) {
    try {
      const result = await this.ticketRepository.delete(id);

      if (result.affected === 0) {
        throw new Error(`Ticket with ID ${id} not found`);
      }

      return { message: `Ticket with ID ${id} has been removed` };
    } catch (error) {
      console.error('Error removing ticket:', error);
      throw new Error('Failed to remove ticket');
    }
  }
}
