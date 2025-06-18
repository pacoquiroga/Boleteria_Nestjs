import {
  Injectable,
  NotFoundException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { CreateCategoryManageDto } from './dto/create-categoryManage.dto';
import { UpdateCategoryManageDto } from './dto/update-categoryManage.dto';
import { CategoryManage } from './entities/categoryManage.entity';
import { EventCategory } from '../event_category/entities/eventCategory.entity';
import { EventEntity } from '../event_entity/entities/eventEntity.entity';
import { EventCategoryService } from '../event_category/eventCategory.service';
import { EventEntityService } from '../event_entity/eventEntity.service';

@Injectable()
export class CategoryManageService {
  constructor(
    @InjectRepository(CategoryManage)
    private categoryManageRepository: Repository<CategoryManage>,
    @InjectRepository(EventCategory)
    private eventCategoryRepository: Repository<EventCategory>,
    @InjectRepository(EventEntity)
    private eventEntityRepository: Repository<EventEntity>,
    private eventCategoryService: EventCategoryService,
    @Inject(forwardRef(() => EventEntityService))
    private eventEntityService: EventEntityService,
  ) {}

  async create(createCategoryManageDto: CreateCategoryManageDto) {
    try {
      const eventCategory = await this.eventCategoryRepository.findOne({
        where: { id: createCategoryManageDto.idEventCategory },
      });

      if (!eventCategory) {
        throw new Error('Categoría de evento no encontrada');
      }

      const eventEntity = await this.eventEntityRepository.findOne({
        where: { id: createCategoryManageDto.idEventEntity },
      });

      if (!eventEntity) {
        throw new Error('Evento no encontrado');
      }

      const categoryManage = this.categoryManageRepository.create({
        eventCategory,
        eventEntity,
      });

      return await this.categoryManageRepository.save(categoryManage);
    } catch (error) {
      throw new Error(`Error al crear la relación: ${error.message}`);
    }
  }

  async findAll() {
    try {
      return await this.categoryManageRepository.find({
        relations: ['eventCategory', 'eventEntity'],
      });
    } catch (error) {
      throw new Error(`Error al obtener las relaciones: ${error.message}`);
    }
  }

  async findOne(id: number) {
    try {
      const categoryManage = await this.categoryManageRepository.findOne({
        where: { id },
        relations: ['eventCategory', 'eventEntity'],
      });

      if (!categoryManage) {
        throw new Error('Relación no encontrada');
      }

      return categoryManage;
    } catch (error) {
      throw new Error(`Error al obtener la relación: ${error.message}`);
    }
  }

  async update(id: number, updateCategoryManageDto: UpdateCategoryManageDto) {
    try {
      const categoryManage = await this.findOne(id);

      if (updateCategoryManageDto.idEventCategory) {
        const eventCategory = await this.eventCategoryRepository.findOne({
          where: { id: updateCategoryManageDto.idEventCategory },
        });

        if (!eventCategory) {
          throw new Error('Categoría de evento no encontrada');
        }

        categoryManage.eventCategory = eventCategory;
      }

      if (updateCategoryManageDto.idEventEntity) {
        const eventEntity = await this.eventEntityRepository.findOne({
          where: { id: updateCategoryManageDto.idEventEntity },
        });

        if (!eventEntity) {
          throw new Error('Evento no encontrado');
        }

        categoryManage.eventEntity = eventEntity;
      }

      return await this.categoryManageRepository.save(categoryManage);
    } catch (error) {
      throw new Error(`Error al actualizar la relación: ${error.message}`);
    }
  }

  async remove(id: number) {
    try {
      const categoryManage = await this.findOne(id);
      await this.categoryManageRepository.remove(categoryManage);
    } catch (error) {
      throw new Error(`Error al eliminar la relación: ${error.message}`);
    }
  }

  async findByEventEntity(eventEntityId: number) {
    try {
      return await this.categoryManageRepository.find({
        where: { eventEntity: { id: eventEntityId } },
        relations: ['eventCategory', 'eventEntity'],
      });
    } catch (error) {
      throw new Error(`Error al buscar por evento: ${error.message}`);
    }
  }

  async findByEventCategory(eventCategoryId: number) {
    try {
      return await this.categoryManageRepository.find({
        where: { eventCategory: { id: eventCategoryId } },
        relations: ['eventCategory', 'eventEntity'],
      });
    } catch (error) {
      throw new Error(`Error al buscar por categoría: ${error.message}`);
    }
  }
}
