import { IsNotEmpty, IsString, IsNumber, IsDateString, IsOptional, MaxLength, Min } from 'class-validator';

export class CreateTicketCategoryDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @MaxLength(30, { message: 'El nombre no puede exceder 30 caracteres' })
  name: string;

  @IsNotEmpty({ message: 'El precio es obligatorio' })
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'El precio debe ser un número con máximo 2 decimales' })
  @Min(0, { message: 'El precio debe ser mayor o igual a 0' })
  price: number;

  @IsOptional()
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @MaxLength(100, { message: 'La descripción no puede exceder 100 caracteres' })
  description?: string;

  @IsNotEmpty({ message: 'Los tickets disponibles son obligatorios' })
  @IsNumber({}, { message: 'Los tickets disponibles deben ser un número entero' })
  @Min(0, { message: 'Los tickets disponibles deben ser mayor o igual a 0' })
  availableTickets: number;

  @IsNotEmpty({ message: 'La fecha de inicio es obligatoria' })
  @IsDateString({}, { message: 'La fecha de inicio debe ser una fecha válida' })
  startDay: string;

  @IsOptional()
  @IsDateString({}, { message: 'La fecha de fin debe ser una fecha válida' })
  endDate?: string;

  @IsNotEmpty({ message: 'El ID del evento es obligatorio' })
  @IsNumber({}, { message: 'El ID del evento debe ser un número' })
  eventId: number;
}
