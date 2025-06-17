import { Injectable } from '@nestjs/common';
import { CreateTicketCategoryDto } from './dto/create-ticketCategory.dto';
import { UpdateTicketCategoryDto } from './dto/update-ticketCategory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TicketCategory } from './entities/ticketCategory.entity';
import { EventEntityService } from 'src/event_entity/eventEntity.service';

@Injectable()
export class TicketCategoryService {
  constructor(
    @InjectRepository(TicketCategory)
    private readonly ticketCategoryRepository: Repository<TicketCategory>,
    private readonly eventService: EventEntityService,
  ) {}

  async create(createTicketCategoryDto: CreateTicketCategoryDto) {
    try {
      const existingEvent = await this.eventService.findOne(createTicketCategoryDto.eventId);
      if (!existingEvent) {
        throw new Error('Event not found');
      }      
      
      const newTicketCategory = this.ticketCategoryRepository.create({
        name: createTicketCategoryDto.name,
        price: createTicketCategoryDto.price,
        description: createTicketCategoryDto.description,
        availableTickets: createTicketCategoryDto.availableTickets,
        startDay: new Date(createTicketCategoryDto.startDay),
        endDate: createTicketCategoryDto.endDate ? new Date(createTicketCategoryDto.endDate) : undefined,
        event: existingEvent,
      });

      const savedTicketCategory = await this.ticketCategoryRepository.save(newTicketCategory);
      return savedTicketCategory;
    } catch (error) {
      console.error('Error creating ticket category:', error);
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const ticketCategory = await this.ticketCategoryRepository.findOne({
        where: { id },
        relations: ['event'] // Incluye la relación con el evento
      });

      if (!ticketCategory) {
        throw new Error(`Ticket category with ID ${id} not found`);
      }

      return ticketCategory;
    } catch (error) {
      console.error('Error finding ticket category:', error);
      throw error;
    }
  }

  update(id: number, updateTicketCategoryDto: UpdateTicketCategoryDto) {
    return `This action updates a #${id} ticketCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} ticketCategory`;
  }

  findAll() {
    return `This action removes a  ticketCategory`;
  }
}
