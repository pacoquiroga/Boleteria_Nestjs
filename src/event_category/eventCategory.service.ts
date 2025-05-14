import { Injectable } from '@nestjs/common';
import { CreateEventCategoryDto } from './dto/create-eventCategory.dto';
import { UpdateEventCategoryDto } from './dto/update-eventCategory.dto';

@Injectable()
export class EventCategoryService {
  create(createEventCategoryDto: CreateEventCategoryDto) {
    return 'This action adds a new eventCategory';
  }

  findAll() {
    return `This action returns all eventCategory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} eventCategory`;
  }

  update(id: number, updateEventCategoryDto: UpdateEventCategoryDto) {
    return `This action updates a #${id} eventCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} eventCategory`;
  }
}
