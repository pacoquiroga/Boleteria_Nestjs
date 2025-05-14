import { Injectable } from '@nestjs/common';
import { CreateEventCategoryDto } from './dto/create-eventCategory.dto';
import { UpdateEventCategoryDto } from './dto/update-eventCategory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventCategory } from './entities/eventCategory.entity';

@Injectable()
export class EventCategoryService {
  constructor(
    @InjectRepository(EventCategory)
    private eventCategoryRepository: Repository<EventCategory>,
  ){}

  async create(createEventCategoryDto: CreateEventCategoryDto) {
    const existingEventCategory = await this.eventCategoryRepository.findBy({name: createEventCategoryDto.name});

    if(existingEventCategory){
      throw new Error('An event category with this name already exists');
    }

    try{
      const newEventCategory = this.eventCategoryRepository.create(createEventCategoryDto);
      return await this.eventCategoryRepository.save(newEventCategory);
    }catch(error){
      throw new Error('Error creating event category: ' + error.message);
    }
  }

  async findAll() {
    const eventCategories = await this.eventCategoryRepository.find();
    if (!eventCategories || eventCategories.length === 0) {
      return new Error('No event categories found');
    }
    return eventCategories;
  }

  findOne(id: number) {
    const eventCategory = this.eventCategoryRepository.findOneBy({id});
    if (!eventCategory) {
      return new Error('Event category not found');
    }
    
    return eventCategory;
  }

  update(id: number, updateEventCategoryDto: UpdateEventCategoryDto) {
    return `This action updates a #${id} eventCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} eventCategory`;
  }
}
