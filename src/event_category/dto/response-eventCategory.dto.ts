import { ApiProperty } from '@nestjs/swagger';

export class ResponseEventCategoryDto {
  @ApiProperty({
    description: 'ID único de la categoría de evento',
    example: 1,
    type: 'number',
  })
  id: number;

  @ApiProperty({
    description: 'Nombre de la categoría de evento',
    example: 'Conciertos',
    type: 'string',
  })
  name: string;

  @ApiProperty({
    description: 'Descripción de la categoría de evento',
    example: 'Eventos musicales y espectáculos en vivo',
    type: 'string',
  })
  description: string;

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
