import { ApiProperty } from '@nestjs/swagger';

export class CategoryManageResponseDto {
  @ApiProperty({
    description: 'ID único de la relación categoría-evento',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Información de la categoría de evento',
    type: 'object',
    properties: {
      id: { type: 'number', example: 1 },
      name: { type: 'string', example: 'Conciertos' },
      description: { type: 'string', example: 'Eventos musicales y conciertos' },
    },
  })
  eventCategory: {
    id: number;
    name: string;
    description?: string;
  };

  @ApiProperty({
    description: 'Información de la entidad del evento',
    type: 'object',
    properties: {
      id: { type: 'number', example: 1 },
      name: { type: 'string', example: 'Concierto Rock 2024' },
      description: { type: 'string', example: 'Gran concierto de rock con artistas nacionales' },
      location: { type: 'string', example: 'Estadio Nacional' },
      eventDate: { type: 'string', format: 'date-time', example: '2024-07-15T20:00:00Z' },
    },
  })
  eventEntity: {
    id: number;
    name: string;
    description?: string;
    location?: string;
    eventDate?: Date;
  };
}

export class ErrorResponseDto {
  @ApiProperty({
    description: 'Código de estado HTTP',
    example: 400,
  })
  statusCode: number;

  @ApiProperty({
    description: 'Mensaje de error',
    oneOf: [
      { type: 'string', example: 'Recurso no encontrado' },
      { type: 'array', items: { type: 'string' }, example: ['El campo es obligatorio', 'Formato inválido'] }
    ],
  })
  message: string | string[];

  @ApiProperty({
    description: 'Tipo de error HTTP',
    example: 'Bad Request',
  })
  error: string;

  @ApiProperty({
    description: 'Timestamp del error',
    example: '2024-01-15T10:30:00Z',
    required: false,
  })
  timestamp?: string;

  @ApiProperty({
    description: 'Path del endpoint que generó el error',
    example: '/api/category-manage/1',
    required: false,
  })
  path?: string;
}
