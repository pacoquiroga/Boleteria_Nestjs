import {
  IsDateString,
  IsDecimal,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateTicketCategoryDto {
  @IsNotEmpty({ message: 'El nombre de la categoría de ticket es requerido' })
  @IsString({
    message: 'El nombre de la categoría de ticket debe ser un texto',
  })
  @MaxLength(30, { message: 'El nombre no puede exceder 30 caracteres' })
  name: string;

  @IsNotEmpty({ message: 'El precio de la categoría de ticket es requerido' })
  @IsDecimal(
    { decimal_digits: '2' },
    { message: 'El precio debe ser un número decimal de 2 dígitos' },
  )
  @Min(0, { message: 'El precio debe ser mayor o igual a 0' })
  price: number;

  @IsNotEmpty({
    message: 'La descripción de la categoría de ticket es requerido',
  })
  @IsString({
    message: 'La descripción de la categoría de ticket debe ser un texto',
  })
  @MaxLength(100, { message: 'La descripción no puede exceder 100 caracteres' })
  description: string;

  @IsNotEmpty({
    message:
      'El número de tickets disponibles de la categoría de ticket es requerido',
  })
  @IsInt({
    message:
      'El número de tickets disponibles de la categoría de ticket debe ser un número entero',
  })
  @Min(0, { message: 'Los tickets disponibles deben ser mayor o igual a 0' })
  availableTickets: number;

  @IsNotEmpty({
    message: 'La fecha de inicio de la categoría de tickets es requerida',
  })
  @IsDateString({}, { message: 'La fecha debe tener un formato válido' })
  startDay: Date;

  @IsNotEmpty({
    message: 'La fecha de fin de la categoría de tickets es requerida',
  })
  @IsDateString({}, { message: 'La fecha debe tener un formato válido' })
  endDate: Date;

  @IsNotEmpty({ message: 'El ID del evento es requerido.' })
  @IsInt({ message: 'El ID del evento debe ser un número entero' })
  eventId: number;
}
