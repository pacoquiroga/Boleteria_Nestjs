import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTicketCategoryDto } from './dto/create-ticketCategory.dto';
import { UpdateTicketCategoryDto } from './dto/update-ticketCategory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TicketCategory } from './entities/ticketCategory.entity';
import { Repository } from 'typeorm';
import { EventEntityService } from 'src/event_entity/eventEntity.service';

@Injectable()
export class TicketCategoryService {
  constructor(
    @InjectRepository(TicketCategory)
    private ticketCategoryRepository: Repository<TicketCategory>,

    private readonly eventEntityService: EventEntityService,
  ) {}

  async createMultiple(createTicketCategoriesDtos: CreateTicketCategoryDto[]) {
    try {
      if (
        !createTicketCategoriesDtos ||
        createTicketCategoriesDtos.length === 0
      ) {
        return [];
      }
      const eventId = createTicketCategoriesDtos[0].eventId;
      const event = await this.eventEntityService.findOne(eventId);

      if (!event) {
        throw new NotFoundException(`Event with id ${eventId} not found`);
      }

      const categoriesWithEvent = createTicketCategoriesDtos.map((dto) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { eventId, ...categoryData } = dto;
        return {
          ...categoryData,
          event,
        };
      });

      const ticketCategories =
        this.ticketCategoryRepository.create(categoriesWithEvent);
      return await this.ticketCategoryRepository.save(ticketCategories);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Error creating multiple ticket categories:', error);
      throw new HttpException('Failed to create ticket categories', 500);
    }
  }

  async findAllTicketCategoriesFromEvent(eventId: number) {
    const event = await this.eventEntityService.findOne(eventId);
    if (!event) {
      throw new NotFoundException(`Event with id ${eventId} not found`);
    }
    return this.ticketCategoryRepository.find({
      where: { event: { id: eventId } },
    });
  }

  async findOne(id: number) {
    const ticketCategory = await this.ticketCategoryRepository.findOneBy({
      id,
    });
    if (!ticketCategory) {
      throw new NotFoundException(`TicketCategory with id #${id} not found`);
    }
    return ticketCategory;
  }

  async update(id: number, updateTicketCategoryDto: UpdateTicketCategoryDto) {
    const ticketCategory = await this.ticketCategoryRepository.preload({
      id,
      ...updateTicketCategoryDto,
    });

    if (!ticketCategory) {
      throw new NotFoundException(`TicketCategory with id #${id} not found`);
    }

    if (updateTicketCategoryDto.eventId) {
      const event = await this.eventEntityService.findOne(
        updateTicketCategoryDto.eventId,
      );
      if (!event) {
        throw new NotFoundException(
          `Event with id ${updateTicketCategoryDto.eventId} not found`,
        );
      }
    }

    try {
      return await this.ticketCategoryRepository.save(ticketCategory);
    } catch (error) {
      console.error(`Error updating ticket category #${id}:`, error);
      throw new HttpException('Failed to update ticket category', 500);
    }
  }

  async remove(id: number) {
    const ticketCategory = await this.findOne(id);
    return this.ticketCategoryRepository.remove(ticketCategory);
  }
}
