import {
  IsDateString,
  IsDecimal,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTicketCategoryDto {
  @ApiProperty({
    description: 'Nombre de la categoría de ticket',
    example: 'VIP',
    type: 'string',
    maxLength: 30,
  })
  @IsNotEmpty({ message: 'El nombre de la categoría de ticket es requerido' })
  @IsString({
    message: 'El nombre de la categoría de ticket debe ser un texto',
  })
  @MaxLength(30, { message: 'El nombre no puede exceder 30 caracteres' })
  name: string;

  @ApiProperty({
    description: 'Precio del ticket en esta categoría',
    example: 159.99,
    type: 'number',
    format: 'double',
    minimum: 0,
  })
  @IsNotEmpty({ message: 'El precio de la categoría de ticket es requerido' })
  @IsDecimal(
    { decimal_digits: '2' },
    { message: 'El precio debe ser un número decimal de 2 dígitos' },
  )
  @Min(0, { message: 'El precio debe ser mayor o igual a 0' })
  price: number;

  @ApiProperty({
    description: 'Descripción detallada de la categoría de ticket',
    example: 'Acceso VIP con zona preferencial y servicios premium',
    type: 'string',
    maxLength: 100,
  })
  @IsNotEmpty({
    message: 'La descripción de la categoría de ticket es requerido',
  })
  @IsString({
    message: 'La descripción de la categoría de ticket debe ser un texto',
  })
  @MaxLength(100, { message: 'La descripción no puede exceder 100 caracteres' })
  description: string;

  @ApiProperty({
    description: 'Número de tickets disponibles en esta categoría',
    example: 100,
    type: 'integer',
    minimum: 0,
  })
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

  @ApiProperty({
    description: 'Fecha de inicio de venta para esta categoría',
    example: '2024-06-01',
    type: 'string',
    format: 'date',
  })
  @IsNotEmpty({
    message: 'La fecha de inicio de la categoría de tickets es requerida',
  })
  @IsDateString({}, { message: 'La fecha debe tener un formato válido' })
  startDay: Date;

  @ApiProperty({
    description: 'Fecha de fin de venta para esta categoría',
    example: '2024-07-14',
    type: 'string',
    format: 'date',
  })
  @IsNotEmpty({
    message: 'La fecha de fin de la categoría de tickets es requerida',
  })
  @IsDateString({}, { message: 'La fecha debe tener un formato válido' })
  endDate: Date;

  @ApiProperty({
    description: 'ID del evento al que pertenece esta categoría de ticket',
    example: 1,
    type: 'integer',
    minimum: 1,
  })
  @IsNotEmpty({ message: 'El ID del evento es requerido.' })
  @IsInt({ message: 'El ID del evento debe ser un número entero' })
  eventId: number;
}
