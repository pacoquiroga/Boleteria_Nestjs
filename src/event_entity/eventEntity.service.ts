import { Injectable, NotFoundException, OnModuleInit, Inject, forwardRef, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventEntityDto } from './dto/create-eventEntity.dto';
import { UpdateEventEntityDto } from './dto/update-eventEntity.dto';
import { EventEntity } from './entities/eventEntity.entity';
import { UserService } from '../user/user.service';
import { EventState } from './enums/event-state.enum';
import { CategoryManageService } from '../category_manage/categoryManage.service';
import { IPaginationResponse } from '../utils/interfaces/pagination.interface';
import { PaginationRequest } from 'src/utils/dto/pagination.dto';

@Injectable()
export class EventEntityService implements OnModuleInit {
  constructor(
    @InjectRepository(EventEntity)
    private eventEntityRepository: Repository<EventEntity>,
    private userService: UserService,
    @Inject(forwardRef(() => CategoryManageService))
    private categoryManageService: CategoryManageService,
  ) {}

  async onModuleInit() {
    await this.seedDefaultEvents();
  }

  private async seedDefaultEvents() {
    try {
      // Buscar un usuario con rol organizador
      const organizer = await this.userService.findUserByRole('organizer');
      
      if (!organizer) {
        console.log('No se encontró un usuario organizador para crear eventos de prueba');
        return;
      }

      const eventTemplates = [
        {
          name: 'Concierto de Rock',
          date: new Date('2024-06-15'),
          hour: '20:00',
          location: 'Estadio Principal',
          city: 'Ciudad Capital',
          description: 'Gran concierto de rock con bandas locales e internacionales',
          capacity: 5000,
          state: EventState.ACTIVE,
          categories: [1, 5]
        },
        {
          name: 'Festival de Teatro',
          date: new Date('2024-07-01'),
          hour: '19:00',
          location: 'Teatro Municipal',
          city: 'Ciudad Cultural',
          description: 'Festival anual de teatro con obras nacionales',
          capacity: 800,
          state: EventState.ACTIVE,
          categories: [2, 5]
        },
        {
          name: 'Torneo de Fútbol',
          date: new Date('2024-08-10'),
          hour: '15:00',
          location: 'Complejo Deportivo',
          city: 'Ciudad Deportiva',
          description: 'Torneo amateur de fútbol',
          capacity: 2000,
          state: EventState.IN_PROGRESS,
          categories: [3]
        },
        {
          name: 'Conferencia Tech',
          date: new Date('2024-09-20'),
          hour: '09:00',
          location: 'Centro de Convenciones',
          city: 'Ciudad Tecnológica',
          description: 'Conferencia sobre las últimas tendencias en tecnología',
          capacity: 1000,
          state: EventState.ACTIVE,
          categories: [4]
        },
        {
          name: 'Exposición de Arte',
          date: new Date('2024-10-05'),
          hour: '10:00',
          location: 'Galería Central',
          city: 'Ciudad Artística',
          description: 'Exposición de artistas emergentes',
          capacity: 300,
          state: EventState.IN_PROGRESS,
          categories: [6]
        },
        {
          name: 'Feria Gastronómica',
          date: new Date('2024-11-15'),
          hour: '11:00',
          location: 'Plaza Principal',
          city: 'Ciudad Gastronómica',
          description: 'Feria con los mejores restaurantes de la ciudad',
          capacity: 1500,
          state: EventState.ACTIVE,
          categories: [7, 9]
        },
        {
          name: 'Festival de Cine',
          date: new Date('2024-12-01'),
          hour: '18:00',
          location: 'Cineplex Central',
          city: 'Ciudad del Cine',
          description: 'Festival de cine independiente',
          capacity: 600,
          state: EventState.OVER,
          categories: [8, 5]
        },
        {
          name: 'Feria del Libro',
          date: new Date('2025-01-20'),
          hour: '09:00',
          location: 'Centro Cultural',
          city: 'Ciudad Literaria',
          description: 'Feria anual del libro con autores nacionales e internacionales',
          capacity: 2000,
          state: EventState.ACTIVE,
          categories: [7, 10]
        },
        {
          name: 'Concierto Sinfónico',
          date: new Date('2025-02-14'),
          hour: '20:00',
          location: 'Auditorio Principal',
          city: 'Ciudad Musical',
          description: 'Concierto de la orquesta sinfónica',
          capacity: 1200,
          state: EventState.ACTIVE,
          categories: [1]
        },
        {
          name: 'Festival Multicultural',
          date: new Date('2025-03-01'),
          hour: '12:00',
          location: 'Parque Central',
          city: 'Ciudad Multicultural',
          description: 'Festival que celebra la diversidad cultural',
          capacity: 3000,
          state: EventState.ACTIVE,
          categories: [5, 9]
        }
      ];

      for (const template of eventTemplates) {
        // Verificar si el evento ya existe
        const existingEvent = await this.eventEntityRepository.findOne({
          where: { name: template.name }
        });

        if (!existingEvent) {
          // Crear el evento
          const newEvent = this.eventEntityRepository.create({
            ...template,
            user: organizer
          });
          
          const savedEvent = await this.eventEntityRepository.save(newEvent);
          console.log(`Evento creado: ${savedEvent.name}`);

          // Crear las asociaciones con las categorías
          for (const categoryId of template.categories) {
            try {
              await this.categoryManageService.create({
                idEventEntity: savedEvent.id,
                idEventCategory: categoryId
              });
              console.log(`Categoría ${categoryId} asociada al evento ${savedEvent.name}`);
            } catch (error) {
              console.log(`Error al asociar categoría ${categoryId} al evento ${savedEvent.name}: ${error.message}`);
            }
          }
        } else {
          console.log(`El evento ${template.name} ya existe`);
        }
      }
    } catch (error) {
      console.error('Error al crear eventos por defecto:', error);
    }
  }

  async create(
    createEventEntityDto: CreateEventEntityDto,
  ): Promise<EventEntity> {
    try {
      // Buscar el usuario usando UserService
      const user = await this.userService.findOne(createEventEntityDto.idUser);

      // Crear una nueva instancia del evento
      const newEvent = this.eventEntityRepository.create({
        ...createEventEntityDto,
        user,
      });

      // Guardar el nuevo evento
      return await this.eventEntityRepository.save(newEvent);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Error al crear el evento: ${error.message}`);
    }
  }

  async findAll(): Promise<EventEntity[]> {
    try {
      return await this.eventEntityRepository.find();
    } catch (error) {
      throw new Error(`Error al obtener los eventos: ${error.message}`);
    }
  }

  async getPaginated(
    pagination: PaginationRequest<EventEntity>
  ): Promise<IPaginationResponse<EventEntity>> {
    try {
      const { page, rowsPage, filter, order } = pagination;

      // Convertir los filtros en objeto con las claves originales
      const filtersObject = Object.keys(filter).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {} as any);

      const skip = (page - 1) * rowsPage;
      const [data, count] = await this.eventEntityRepository.findAndCount({
        skip,
        take: rowsPage,
        order: { id: order },
        where: filter,
        relations: ['user'],
        select: filtersObject,
      });

      return {
        data,
        count,
        page,
        rowsPage,
      };
    } catch (error) {
      console.error('Error in getPaginated:', error);
      throw new HttpException(
        'Error fetching paginated events',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number): Promise<EventEntity> {
    try {
      const event = await this.eventEntityRepository.findOne({
        where: { id },
        relations: ['user'],
      });

      if (!event) {
        throw new NotFoundException(`Evento con ID ${id} no encontrado`);
      }

      return event;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Error al buscar el evento: ${error.message}`);
    }
  }

  async update(
    id: number,
    updateEventEntityDto: UpdateEventEntityDto,
  ): Promise<EventEntity> {
    try {
      // Verificar si el evento existe
      const event = await this.findOne(id);

      // Si se proporciona un nuevo usuario, verificar que existe usando UserService
      if (updateEventEntityDto.idUser) {
        const user = await this.userService.findOne(
          updateEventEntityDto.idUser,
        );

        // Actualizar la relación con el usuario
        event.user = user;
      }

      // Actualizar los otros campos del evento
      Object.assign(event, updateEventEntityDto);

      // Guardar los cambios
      return await this.eventEntityRepository.save(event);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Error al actualizar el evento: ${error.message}`);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      // Verificar si el evento existe
      const event = await this.findOne(id);

      // Eliminar el evento
      await this.eventEntityRepository.remove(event);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Error al eliminar el evento: ${error.message}`);
    }
  }

  async findByUser(userId: number): Promise<EventEntity[]> {
    try {
      return await this.eventEntityRepository.find({
        where: { user: { id: userId } },
        relations: ['user'],
      });
    } catch (error) {
      throw new Error(`Error al buscar eventos por usuario: ${error.message}`);
    }
  }

  async findByState(state: EventState): Promise<EventEntity[]> {
    try {
      return await this.eventEntityRepository.find({
        where: { state },
        relations: ['user'],
      });
    } catch (error) {
      throw new Error(`Error al buscar eventos por estado: ${error.message}`);
    }
  }
}
