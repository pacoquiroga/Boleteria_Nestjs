import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsEnum,
  IsArray,
  ValidateNested,
  IsOptional,
  IsString,
  IsEmail,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type, Transform } from 'class-transformer';
import { TransactionState } from '../enums/transaction-state.enum';
import { PaymentMethod } from '../enums/payment-method.enum';

class TicketCategoryRequest {
  @ApiProperty({
    description: 'ID de la categoría de ticket a comprar',
    example: 1,
    type: 'integer',
    minimum: 1,
  })
  @IsNotEmpty()
  @IsNumber({}, { message: 'El ID de la categoría debe ser un número' })
  ticketCategoryId: number;

  @ApiProperty({
    description: 'Cantidad de tickets a comprar de esta categoría',
    example: 2,
    type: 'integer',
    minimum: 1,
    maximum: 10,
  })
  @IsNotEmpty()
  @IsNumber({}, { message: 'La cantidad debe ser un número' })
  quantity: number;
}

export class CreateTransactionDto {
  @ApiProperty({
    description: 'Monto total de la transacción',
    example: 319.98,
    type: 'number',
    format: 'double',
    minimum: 0,
  })
  @IsNotEmpty()
  @IsNumber({}, { message: 'El monto total debe ser un número' })
  totalAmount: number;

  @ApiPropertyOptional({
    description: 'Estado inicial de la transacción',
    enum: TransactionState,
    example: TransactionState.PENDING,
    default: TransactionState.PENDING,
    enumName: 'TransactionState',
  })
  @IsOptional()
  @IsEnum(TransactionState, { message: 'El estado debe ser un valor válido' })
  state: TransactionState = TransactionState.PENDING;

  @ApiProperty({
    description: 'Método de pago seleccionado',
    enum: PaymentMethod,
    example: PaymentMethod.CREDIT_CARD,
    enumName: 'PaymentMethod',
  })
  @IsNotEmpty()
  @IsEnum(PaymentMethod, {
    message: 'El método de pago debe ser un valor válido',
  })
  paymentMethod: PaymentMethod;

  @ApiProperty({
    description: 'ID del evento para el cual se compran los tickets',
    example: 1,
    type: 'integer',
    minimum: 1,
  })
  @IsNotEmpty()
  @IsNumber({}, { message: 'El ID del evento debe ser un número' })
  eventId: number;

  @ApiPropertyOptional({
    description: 'Fecha de la compra',
    example: '2024-07-15T10:30:00Z',
    type: 'string',
    format: 'date-time',
  })
  @IsOptional()
  @IsDate({ message: 'La fecha de compra debe ser una fecha válida' })
  @Transform(({ value }) => (value ? new Date(value) : new Date()))
  purchaseDate: Date = new Date();

  @ApiPropertyOptional({
    description: 'ID del usuario propietario (si está registrado)',
    example: 1,
    type: 'integer',
    minimum: 1,
  })
  @IsOptional()
  @IsNumber({}, { message: 'El ID del propietario debe ser un número' })
  ownerId?: number;

  @ApiProperty({
    description: 'Email del comprador/propietario de los tickets',
    example: 'comprador@email.com',
    type: 'string',
    format: 'email',
  })
  @IsNotEmpty()
  @IsEmail({}, { message: 'El email del propietario debe ser válido' })
  ownerEmail: string;

  @ApiProperty({
    description: 'Nombre del comprador/propietario',
    example: 'Juan',
    type: 'string',
    maxLength: 50,
  })
  @IsNotEmpty()
  @IsString({ message: 'El nombre del propietario debe ser un string' })
  ownerName: string;

  @ApiProperty({
    description: 'Apellido del comprador/propietario',
    example: 'Pérez',
    type: 'string',
    maxLength: 50,
  })
  @IsNotEmpty()
  @IsString({ message: 'El apellido del propietario debe ser un string' })
  ownerLastname: string;

  @ApiProperty({
    description: 'Cédula de identidad del comprador/propietario',
    example: '12345678',
    type: 'string',
    maxLength: 20,
  })
  @IsNotEmpty()
  @IsString({ message: 'La cédula del propietario debe ser un string' })
  ownerCi: string;

  @ApiPropertyOptional({
    description: 'Ruta del comprobante de pago subido',
    example: '/uploads/vouchers/comprobante_12345.pdf',
    type: 'string',
  })
  @IsOptional()
  @IsString()
  voucherPath?: string;

  @ApiProperty({
    description: 'Lista de categorías de tickets y cantidades a comprar',
    type: [TicketCategoryRequest],
    isArray: true,
    example: [
      { ticketCategoryId: 1, quantity: 2 },
      { ticketCategoryId: 2, quantity: 1 }
    ]
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TicketCategoryRequest)
  ticketCategoryRequests: TicketCategoryRequest[];
}
