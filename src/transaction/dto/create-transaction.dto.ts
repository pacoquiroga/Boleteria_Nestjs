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
import { Type, Transform } from 'class-transformer';
import { TransactionState } from '../enums/transaction-state.enum';
import { PaymentMethod } from '../enums/payment-method.enum';

class TicketCategoryRequest {
  @IsNotEmpty()
  @IsNumber({}, { message: 'El ID de la categoría debe ser un número' })
  ticketCategoryId: number;

  @IsNotEmpty()
  @IsNumber({}, { message: 'La cantidad debe ser un número' })
  quantity: number;
}

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsNumber({}, { message: 'El monto total debe ser un número' })
  totalAmount: number;

  @IsOptional()
  @IsEnum(TransactionState, { message: 'El estado debe ser un valor válido' })
  state: TransactionState = TransactionState.PENDING;

  @IsNotEmpty()
  @IsOptional()
  @IsEnum(PaymentMethod, {
    message: 'El método de pago debe ser un valor válido',
  })
  paymentMethod: PaymentMethod;

  @IsNotEmpty()
  @IsNumber({}, { message: 'El ID del evento debe ser un número' })
  eventId: number;

  // Campos de información del comprador    @IsOptional()
  @IsDate({ message: 'La fecha de compra debe ser una fecha válida' })
  @Transform(({ value }) => (value ? new Date(value) : new Date()))
  purchaseDate: Date = new Date();

  @IsOptional()
  @IsNumber({}, { message: 'El ID del propietario debe ser un número' })
  ownerId?: number;

  @IsNotEmpty()
  @IsEmail({}, { message: 'El email del propietario debe ser válido' })
  ownerEmail: string;

  @IsNotEmpty()
  @IsString({ message: 'El nombre del propietario debe ser un string' })
  ownerName: string;

  @IsNotEmpty()
  @IsString({ message: 'El apellido del propietario debe ser un string' })
  ownerLastname: string;

  @IsNotEmpty()
  @IsString({ message: 'La cédula del propietario debe ser un string' })
  ownerCi: string;

  @IsOptional()
  @IsString()
  voucherPath?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TicketCategoryRequest)
  ticketCategoryRequests: TicketCategoryRequest[];
}
