import { ApiProperty } from '@nestjs/swagger';

export class ResponseTransactionDto {
  @ApiProperty({
    description: 'ID único de la transacción',
    example: 1,
    type: 'number',
  })
  id: number;

  @ApiProperty({
    description: 'Monto total de la transacción',
    example: 150.00,
    type: 'number',
    format: 'decimal',
  })
  totalAmount: number;

  @ApiProperty({
    description: 'Estado actual de la transacción',
    example: 'PENDING',
    type: 'string',
  })
  state: string;

  @ApiProperty({
    description: 'Método de pago utilizado',
    example: 'CREDIT_CARD',
    type: 'string',
  })
  paymentMethod: string;

  @ApiProperty({
    description: 'Fecha y hora de la compra',
    example: '2024-01-15T10:30:00.000Z',
    type: 'string',
    format: 'date-time',
  })
  purchaseDate: Date;

  @ApiProperty({
    description: 'ID del propietario (usuario registrado)',
    example: 1,
    type: 'number',
    nullable: true,
  })
  ownerId?: number;

  @ApiProperty({
    description: 'Email del comprador',
    example: 'comprador@email.com',
    type: 'string',
  })
  ownerEmail: string;

  @ApiProperty({
    description: 'Nombre del comprador',
    example: 'Juan',
    type: 'string',
  })
  ownerName: string;

  @ApiProperty({
    description: 'Apellido del comprador',
    example: 'Pérez',
    type: 'string',
  })
  ownerLastname: string;

  @ApiProperty({
    description: 'Cédula de identidad del comprador',
    example: '12345678',
    type: 'string',
  })
  ownerCi: string;

  @ApiProperty({
    description: 'Ruta del comprobante de pago subido',
    example: 'uploads/vouchers/voucher-1642253400000-123456789.jpg',
    type: 'string',
    nullable: true,
  })
  voucherPath: string;

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
