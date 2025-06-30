import { ApiProperty } from '@nestjs/swagger';

export class ResponseTicketDto {
  @ApiProperty({
    description: 'ID único del ticket',
    example: 1,
    type: 'number',
  })
  id: number;

  @ApiProperty({
    description: 'Código QR del ticket para validación',
    example: 'QR_ABC123XYZ789',
    type: 'string',
    nullable: true,
  })
  qrCode: string;

  @ApiProperty({
    description: 'Estado actual del ticket',
    example: 'ACTIVE',
    type: 'string',
    enum: ['PENDING', 'ACTIVE', 'USED', 'CANCELLED'],
  })
  state: string;

  @ApiProperty({
    description: 'Fecha y hora de uso del ticket',
    example: '2024-08-15T20:30:00.000Z',
    type: 'string',
    format: 'date-time',
    nullable: true,
  })
  useDate: Date;

  @ApiProperty({
    description: 'Información de la categoría del ticket',
    type: 'object',
    properties: {
      id: { type: 'number', example: 1 },
      name: { type: 'string', example: 'VIP' },
      price: { type: 'number', example: 150.00 },
      description: { type: 'string', example: 'Acceso VIP con asientos preferenciales' },
    },
  })
  ticketCategory: {
    id: number;
    name: string;
    price: number;
    description: string;
  };

  @ApiProperty({
    description: 'Información de la transacción asociada',
    type: 'object',
    properties: {
      id: { type: 'number', example: 1 },
      totalAmount: { type: 'number', example: 150.00 },
      state: { type: 'string', example: 'CONFIRMED' },
      paymentMethod: { type: 'string', example: 'CREDIT_CARD' },
      ownerName: { type: 'string', example: 'Juan Pérez' },
    },
  })
  transaction: {
    id: number;
    totalAmount: number;
    state: string;
    paymentMethod: string;
    ownerName: string;
  };
}
