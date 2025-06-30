import { ApiProperty } from '@nestjs/swagger';

export class ResponseTicketCategoryDto {
  @ApiProperty({
    description: 'ID único de la categoría de ticket',
    example: 1,
    type: 'number',
  })
  id: number;

  @ApiProperty({
    description: 'Nombre de la categoría de ticket',
    example: 'VIP',
    type: 'string',
  })
  name: string;

  @ApiProperty({
    description: 'Precio del ticket',
    example: 150.00,
    type: 'number',
    format: 'decimal',
  })
  price: number;

  @ApiProperty({
    description: 'Descripción de la categoría de ticket',
    example: 'Acceso VIP con asientos preferenciales y bebidas incluidas',
    type: 'string',
  })
  description: string;

  @ApiProperty({
    description: 'Número de tickets disponibles',
    example: 100,
    type: 'number',
  })
  availableTickets: number;

  @ApiProperty({
    description: 'Fecha de inicio de venta de tickets',
    example: '2024-01-15',
    type: 'string',
    format: 'date',
  })
  startDay: Date;

  @ApiProperty({
    description: 'Fecha de fin de venta de tickets',
    example: '2024-08-15',
    type: 'string',
    format: 'date',
    nullable: true,
  })
  endDate: Date;

  @ApiProperty({
    description: 'Información del evento asociado',
    type: 'object',
    properties: {
      id: { type: 'number', example: 1 },
      name: { type: 'string', example: 'Concierto de Rock 2024' },
    },
  })
  event: {
    id: number;
    name: string;
  };
}
