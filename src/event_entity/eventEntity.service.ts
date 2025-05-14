import { Injectable } from '@nestjs/common';
import { CreateEventEntityDto } from './dto/create-eventEntity.dto';
import { UpdateEventEntityDto } from './dto/update-eventEntity.dto';

@Injectable()
export class EventEntityService {
  create(createEventEntityDto: CreateEventEntityDto) {
    return 'This action adds a new eventEntity';
  }

  findAll() {
    return `This action returns all eventEntity`;
  }

  findOne(id: number) {
    return `This action returns a #${id} eventEntity`;
  }

  update(id: number, updateEventEntityDto: UpdateEventEntityDto) {
    return `This action updates a #${id} eventEntity`;
  }

  remove(id: number) {
    return `This action removes a #${id} eventEntity`;
  }
}
