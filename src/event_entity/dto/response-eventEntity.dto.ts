import { ApiProperty } from '@nestjs/swagger';
import { EventState } from '../enums/event-state.enum';

export class ResponseEventEntityDto {
  @ApiProperty({
    description: 'ID único del evento',
    example: 1,
    type: 'number',
  })
  id: number;

  @ApiProperty({
    description: 'Nombre del evento',
    example: 'Concierto de Rock 2024',
    type: 'string',
  })
  name: string;

  @ApiProperty({
    description: 'Descripción del evento',
    example: 'El mejor concierto de rock del año con bandas internacionales',
    type: 'string',
  })
  description: string;

  @ApiProperty({
    description: 'Fecha y hora del evento',
    example: '2024-08-15T20:00:00.000Z',
    type: 'string',
    format: 'date-time',
  })
  date: Date;

  @ApiProperty({
    description: 'Ciudad donde se realizará el evento',
    example: 'Madrid',
    type: 'string',
  })
  city: string;

  @ApiProperty({
    description: 'Dirección del evento',
    example: 'Palacio de Deportes, Av. Felipe II, s/n',
    type: 'string',
  })
  address: string;

  @ApiProperty({
    description: 'Capacidad máxima del evento',
    example: 10000,
    type: 'number',
  })
  capacity: number;

  @ApiProperty({
    description: 'ID del usuario organizador',
    example: 1,
    type: 'number',
  })
  idUser: number;

  @ApiProperty({
    description: 'Estado actual del evento',
    example: EventState.ACTIVE,
    enum: EventState,
  })
  state: EventState;

  @ApiProperty({
    description: 'Fecha de creación del registro',
    example: '2024-01-15T10:30:00.000Z',
    type: 'string',
    format: 'date-time',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Fecha de última actualización del registro',
    example: '2024-01-20T14:45:00.000Z',
    type: 'string',
    format: 'date-time',
  })
  updatedAt: Date;
}
