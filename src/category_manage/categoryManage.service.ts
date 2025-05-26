import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { CreateCategoryManageDto } from './dto/create-categoryManage.dto';
import { UpdateCategoryManageDto } from './dto/update-categoryManage.dto';
import { CategoryManage } from './entities/categoryManage.entity';
import { EventCategoryService } from '../event_category/eventCategory.service';
import { EventEntityService } from '../event_entity/eventEntity.service';

@Injectable()
export class CategoryManageService {
  constructor(
    @InjectRepository(CategoryManage)
    private categoryManageRepository: Repository<CategoryManage>,
    private eventCategoryService: EventCategoryService,
    private eventEntityService: EventEntityService,
  ) {}

  async create(entity: CreateCategoryManageDto): Promise<CategoryManage> {
    try {
      // Verificar si la categoría existe
      const eventCategory = await this.eventCategoryService.findOne(
        entity.idEventCategory,
      );

      // Verificar si el evento existe
      const eventEntity = await this.eventEntityService.findOne(
        entity.idEventEntity,
      );

      // Verificar si ya existe una asociación entre esta categoría y este evento
      const existingRelation = await this.categoryManageRepository.findOne({
        where: {
          eventCategory: {
            idEventCategory: entity.idEventCategory,
          },
          eventEntity: { idEvent: entity.idEventEntity },
        },
        relations: ['eventCategory', 'eventEntity'],
      });

      if (existingRelation) {
        throw new Error(
          'Ya existe una asociación entre esta categoría y este evento',
        );
      }

      // Crear una nueva instancia de la asociación
      const newCategoryManage = this.categoryManageRepository.create({
        eventCategory,
        eventEntity,
      });

      // Guardar la nueva asociación
      return await this.categoryManageRepository.save(newCategoryManage);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Error al crear la asociación: ${error.message}`);
    }
  }

  async findAll(): Promise<CategoryManage[]> {
    try {
      return await this.categoryManageRepository.find({
        relations: ['eventCategory', 'eventEntity'],
      });
    } catch (error) {
      throw new Error(`Error al obtener las asociaciones: ${error.message}`);
    }
  }

  async findOne(id: number): Promise<CategoryManage> {
    try {
      const categoryManage = await this.categoryManageRepository.findOne({
        where: { idCategoryManage: id },
        relations: ['eventCategory', 'eventEntity'],
      });

      if (!categoryManage) {
        throw new NotFoundException(`Asociación con ID ${id} no encontrada`);
      }

      return categoryManage;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Error al buscar la asociación: ${error.message}`);
    }
  }

  async update(
    id: number,
    entity: UpdateCategoryManageDto,
  ): Promise<CategoryManage> {
    try {
      // Verificar si la asociación existe
      const categoryManage = await this.findOne(id);

      // Si se proporciona una nueva categoría, verificar que existe
      if (entity.idEventCategory) {
        const eventCategory = await this.eventCategoryService.findOne(
          entity.idEventCategory,
        );
        categoryManage.eventCategory = eventCategory;
      }

      // Si se proporciona un nuevo evento, verificar que existe
      if (entity.idEventEntity) {
        const eventEntity = await this.eventEntityService.findOne(
          entity.idEventEntity,
        );
        categoryManage.eventEntity = eventEntity;
      }

      // Verificar si ya existe otra asociación con la misma combinación
      if (entity.idEventCategory || entity.idEventEntity) {
        const categoryId =
          entity.idEventCategory ||
          categoryManage.eventCategory.idEventCategory;
        const entityId =
          entity.idEventEntity || categoryManage.eventEntity.idEvent;

        const existingRelation = await this.categoryManageRepository.findOne({
          where: {
            idCategoryManage: Not(id),
            eventCategory: { idEventCategory: categoryId },
            eventEntity: { idEvent: entityId },
          },
          relations: ['eventCategory', 'eventEntity'],
        });

        if (existingRelation) {
          throw new Error(
            'Ya existe otra asociación con esta categoría y este evento',
          );
        }
      }

      // Guardar los cambios
      return await this.categoryManageRepository.save(categoryManage);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Error al actualizar la asociación: ${error.message}`);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      // Verificar si la asociación existe
      const categoryManage = await this.findOne(id);

      // Eliminar la asociación
      await this.categoryManageRepository.remove(categoryManage);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Error al eliminar la asociación: ${error.message}`);
    }
  }

  // Métodos adicionales útiles

  async findByEventCategory(categoryId: number): Promise<CategoryManage[]> {
    try {
      // Verificar si la categoría existe
      await this.eventCategoryService.findOne(categoryId);

      return await this.categoryManageRepository.find({
        where: {
          eventCategory: { idEventCategory: categoryId },
        },
        relations: ['eventCategory', 'eventEntity'],
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(
        `Error al buscar asociaciones por categoría: ${error.message}`,
      );
    }
  }

  async findByEventEntity(eventId: number): Promise<CategoryManage[]> {
    try {
      // Verificar si el evento existe
      await this.eventEntityService.findOne(eventId);

      return await this.categoryManageRepository.find({
        where: {
          eventEntity: { idEvent: eventId },
        },
        relations: ['eventCategory', 'eventEntity'],
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(
        `Error al buscar asociaciones por evento: ${error.message}`,
      );
    }
  }
}
