import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateTicketDto {
  @IsNotEmpty()
  @IsString({ message: 'El código QR debe ser un string' })
  qrCode: string;

  @IsNotEmpty()
  @IsString({ message: 'El estado debe ser un string' })
  state: string;

  @IsOptional()
  @IsDate({ message: 'La fecha de uso debe ser una fecha válida' })
  @Transform(({ value }) => (value ? new Date(value) : null))
  useDate?: Date;

  @IsNotEmpty()
  @IsNumber(
    {},
    { message: 'El ID de la categoría de ticket debe ser un número' },
  )
  ticketCategoryId: number;

  @IsNotEmpty()
  @IsNumber({}, { message: 'El ID de la transacción debe ser un número' })
  transactionId: number;
}
