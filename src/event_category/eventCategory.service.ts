import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { CreateEventCategoryDto } from './dto/create-eventCategory.dto';
import { UpdateEventCategoryDto } from './dto/update-eventCategory.dto';
import { EventCategory } from './entities/eventCategory.entity';

@Injectable()
export class EventCategoryService {
  constructor(
    @InjectRepository(EventCategory)
    private eventCategoryRepository: Repository<EventCategory>,
  ) {
    this.seedDefaultCategories();
  }

  async create(
    createEventCategoryDto: CreateEventCategoryDto,
  ): Promise<EventCategory> {
    try {
      // Verificar si ya existe una categoría con el mismo nombre
      const existingCategory = await this.eventCategoryRepository.findOne({
        where: { name: createEventCategoryDto.name },
      });

      if (existingCategory) {
        throw new Error('Ya existe una categoría con este nombre');
      }

      // Crear una nueva instancia de la categoría
      const newCategory = this.eventCategoryRepository.create(
        createEventCategoryDto,
      );

      // Guardar la nueva categoría
      return await this.eventCategoryRepository.save(newCategory);
    } catch (error) {
      throw new Error(`Error al crear la categoría: ${error.message}`);
    }
  }

  async findAll(): Promise<EventCategory[]> {
    try {
      return await this.eventCategoryRepository.find();
    } catch (error) {
      throw new Error(`Error al obtener las categorías: ${error.message}`);
    }
  }

  async findOne(id: number): Promise<EventCategory> {
    try {
      const category = await this.eventCategoryRepository.findOne({
        where: { id },
      });

      if (!category) {
        throw new NotFoundException(`Categoría con ID ${id} no encontrada`);
      }

      return category;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Error al buscar la categoría: ${error.message}`);
    }
  }

  async update(
    id: number,
    updateEventCategoryDto: UpdateEventCategoryDto,
  ): Promise<EventCategory> {
    try {
      // Verificar si la categoría existe
      const category = await this.findOne(id);

      // Si se intenta actualizar el nombre, verificar que no exista otro con ese nombre
      if (updateEventCategoryDto.name) {
        const existingCategory = await this.eventCategoryRepository.findOne({
          where: {
            name: updateEventCategoryDto.name,
            id: Not(id), // Excluir la categoría actual
          },
        });

        if (existingCategory) {
          throw new Error('Ya existe otra categoría con este nombre');
        }
      }

      // Actualizar los campos de la categoría
      Object.assign(category, updateEventCategoryDto);

      // Guardar los cambios
      return await this.eventCategoryRepository.save(category);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Error al actualizar la categoría: ${error.message}`);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      // Verificar si la categoría existe
      const category = await this.findOne(id);

      // Eliminar la categoría
      await this.eventCategoryRepository.remove(category);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Error al eliminar la categoría: ${error.message}`);
    }
  }

  async seedDefaultCategories(): Promise<void> {
    const defaultCategories = [
      { name: 'Concierto', description: 'Eventos musicales en vivo' },
      { name: 'Teatro', description: 'Obras y espectáculos teatrales' },
      { name: 'Deporte', description: 'Eventos deportivos' },
      { name: 'Conferencia', description: 'Charlas y conferencias' },
      { name: 'Festival', description: 'Festivales culturales y artísticos' },
      { name: 'Exposición', description: 'Exhibiciones de arte y cultura' },
      { name: 'Feria', description: 'Ferias comerciales y de entretenimiento' },
      { name: 'Cine', description: 'Proyecciones de películas y documentales' },
      {
        name: 'Gastronomía',
        description: 'Eventos relacionados con la comida',
      },
      {
        name: 'Literatura',
        description: 'Lecturas y presentaciones literarias',
      },
    ];
    for (const category of defaultCategories) {
      const exists = await this.eventCategoryRepository.findOne({
        where: { name: category.name },
      });
      if (!exists) {
        console.log('Categorias creadas');
        await this.eventCategoryRepository.save(category);
      }
    }
  }
}
