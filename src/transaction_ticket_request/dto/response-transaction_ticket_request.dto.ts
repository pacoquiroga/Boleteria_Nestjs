import { ApiProperty } from '@nestjs/swagger';

export class ResponseTransactionTicketRequestDto {
  @ApiProperty({
    description: 'ID único de la solicitud de ticket',
    example: 1,
    type: 'number',
  })
  id: number;

  @ApiProperty({
    description: 'Cantidad de tickets solicitados',
    example: 3,
    type: 'number',
  })
  quantity: number;

  @ApiProperty({
    description: 'Información de la transacción asociada',
    type: 'object',
    properties: {
      id: { type: 'number', example: 1 },
      totalAmount: { type: 'number', example: 450.00 },
      state: { type: 'string', example: 'CONFIRMED' },
      paymentMethod: { type: 'string', example: 'CREDIT_CARD' },
      ownerName: { type: 'string', example: 'Juan Pérez' },
      ownerEmail: { type: 'string', example: 'juan.perez@email.com' },
    },
  })
  transaction: {
    id: number;
    totalAmount: number;
    state: string;
    paymentMethod: string;
    ownerName: string;
    ownerEmail: string;
  };

  @ApiProperty({
    description: 'Información de la categoría de ticket solicitada',
    type: 'object',
    properties: {
      id: { type: 'number', example: 1 },
      name: { type: 'string', example: 'VIP' },
      price: { type: 'number', example: 150.00 },
      description: { type: 'string', example: 'Acceso VIP con asientos preferenciales' },
      availableTickets: { type: 'number', example: 97 },
    },
  })
  ticketCategory: {
    id: number;
    name: string;
    price: number;
    description: string;
    availableTickets: number;
  };
}
