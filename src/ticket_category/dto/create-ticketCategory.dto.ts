import {
  IsDateString,
  IsDecimal,
  IsInt,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateTicketCategoryDto {
  @IsNotEmpty({ message: 'El nombre de la categoría de ticket es requerido' })
  @IsString({
    message: 'El nombre de la categoría de ticket debe ser un texto',
  })
  name: string;

  @IsNotEmpty({ message: 'El precio de la categoría de ticket es requerido' })
  @IsDecimal(
    { decimal_digits: '2' },
    { message: 'El precio debe ser un número decimal de 2 dígitos' },
  )
  price: number;

  @IsNotEmpty({
    message: 'La descripción de la categoría de ticket es requerido',
  })
  @IsString({
    message: 'La descripción de la categoría de ticket debe ser un texto',
  })
  description: string;

  @IsNotEmpty({
    message:
      'El número de tickets disponibles de la categoría de ticket es requerido',
  })
  @IsInt({
    message:
      'El número de tickets disponibles de la categoría de ticket debe ser un número entero',
  })
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
