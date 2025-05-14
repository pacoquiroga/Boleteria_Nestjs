import { Injectable } from '@nestjs/common';
import { CreateTicketCategoryDto } from './dto/create-ticketCategory.dto';
import { UpdateTicketCategoryDto } from './dto/update-ticketCategory.dto';

@Injectable()
export class TicketCategoryService {
  create(createTicketCategoryDto: CreateTicketCategoryDto) {
    return 'This action adds a new ticketCategory';
  }

  findAll() {
    return `This action returns all ticketCategory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ticketCategory`;
  }

  update(id: number, updateTicketCategoryDto: UpdateTicketCategoryDto) {
    return `This action updates a #${id} ticketCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} ticketCategory`;
  }
}
