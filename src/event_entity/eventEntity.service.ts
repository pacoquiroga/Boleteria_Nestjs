import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventEntityDto } from './dto/create-eventEntity.dto';
import { UpdateEventEntityDto } from './dto/update-eventEntity.dto';
import { EventEntity } from './entities/eventEntity.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class EventEntityService {
  constructor(
    @InjectRepository(EventEntity)
    private eventEntityRepository: Repository<EventEntity>,
    private userService: UserService,
  ) {}

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

  async findOne(id: number): Promise<EventEntity> {
    try {
      const event = await this.eventEntityRepository.findOne({
        where: { idEvent: id },
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
        where: { user: { idUser: userId } },
        relations: ['user'],
      });
    } catch (error) {
      throw new Error(`Error al buscar eventos por usuario: ${error.message}`);
    }
  }

  async findByState(state: string): Promise<EventEntity[]> {
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
