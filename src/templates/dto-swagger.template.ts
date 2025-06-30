/**
 * TEMPLATE DE DTO CON SWAGGER
 * 
 * Este archivo es un template que puedes usar como base para todos tus DTOs.
 * Incluye ejemplos de todos los decoradores más comunes.
 */

import { 
  IsString, 
  IsNumber, 
  IsEmail, 
  IsOptional, 
  IsNotEmpty, 
  IsEnum,
  IsBoolean,
  IsDate,
  IsArray,
  ValidateNested,
  Min,
  Max,
  Length,
  Matches,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type, Transform } from 'class-transformer';

// Enum de ejemplo
enum StatusEnum {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending',
}

// DTO anidado de ejemplo
export class NestedExampleDto {
  @ApiProperty({
    description: 'ID del recurso anidado',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    description: 'Nombre del recurso anidado',
    example: 'Categoría Principal',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class CreateExampleDto {
  // 📝 Campo de texto obligatorio
  @ApiProperty({
    description: 'Nombre del recurso',
    example: 'Mi Evento Increíble',
    minLength: 3,
    maxLength: 100,
    type: 'string',
  })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @Length(3, 100, { message: 'El nombre debe tener entre 3 y 100 caracteres' })
  name: string;

  // 📧 Campo de email
  @ApiProperty({
    description: 'Correo electrónico del usuario',
    example: 'usuario@ejemplo.com',
    format: 'email',
  })
  @IsEmail({}, { message: 'Debe ser un email válido' })
  @IsNotEmpty({ message: 'El email es obligatorio' })
  email: string;

  // 🔢 Campo numérico con validaciones
  @ApiProperty({
    description: 'Edad del usuario',
    example: 25,
    minimum: 18,
    maximum: 99,
    type: 'integer',
  })
  @IsNumber(
    { maxDecimalPlaces: 0 }, 
    { message: 'La edad debe ser un número entero' }
  )
  @Min(18, { message: 'La edad mínima es 18 años' })
  @Max(99, { message: 'La edad máxima es 99 años' })
  age: number;

  // 💰 Campo decimal (precio)
  @ApiProperty({
    description: 'Precio del ticket',
    example: 59.99,
    type: 'number',
    format: 'double',
    minimum: 0,
  })
  @IsNumber(
    { maxDecimalPlaces: 2 }, 
    { message: 'El precio debe ser un número con máximo 2 decimales' }
  )
  @Min(0, { message: 'El precio no puede ser negativo' })
  price: number;

  // 📅 Campo de fecha
  @ApiProperty({
    description: 'Fecha del evento',
    example: '2024-07-15T20:00:00Z',
    type: 'string',
    format: 'date-time',
  })
  @IsDate({ message: 'Debe ser una fecha válida' })
  @Type(() => Date) // Transforma string a Date
  eventDate: Date;

  // 🔘 Campo booleano
  @ApiProperty({
    description: 'Indica si el evento está activo',
    example: true,
    default: true,
  })
  @IsBoolean({ message: 'Debe ser un valor booleano' })
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  isActive: boolean;

  // 📋 Campo enum
  @ApiProperty({
    description: 'Estado del recurso',
    enum: StatusEnum,
    example: StatusEnum.ACTIVE,
    enumName: 'StatusEnum',
  })
  @IsEnum(StatusEnum, { 
    message: `El estado debe ser uno de: ${Object.values(StatusEnum).join(', ')}` 
  })
  status: StatusEnum;

  // 📱 Campo con patrón regex (teléfono)
  @ApiProperty({
    description: 'Número de teléfono',
    example: '+1234567890',
    pattern: '^\\+[1-9]\\d{1,14}$',
  })
  @IsString()
  @Matches(/^\+[1-9]\d{1,14}$/, {
    message: 'El teléfono debe tener formato internacional (+1234567890)',
  })
  phone: string;

  // 📝 Campo opcional
  @ApiPropertyOptional({
    description: 'Descripción opcional del recurso',
    example: 'Esta es una descripción detallada del evento...',
    maxLength: 500,
  })
  @IsOptional()
  @IsString()
  @Length(0, 500, { message: 'La descripción no puede superar los 500 caracteres' })
  description?: string;

  // 🏷️ Array de strings
  @ApiProperty({
    description: 'Lista de etiquetas',
    example: ['música', 'rock', 'concierto'],
    type: [String],
    isArray: true,
  })
  @IsArray({ message: 'Las etiquetas deben ser un array' })
  @IsString({ each: true, message: 'Cada etiqueta debe ser una cadena de texto' })
  tags: string[];

  // 🔢 Array de números
  @ApiProperty({
    description: 'IDs de categorías asociadas',
    example: [1, 2, 3],
    type: [Number],
    isArray: true,
  })
  @IsArray()
  @IsNumber({}, { each: true, message: 'Cada ID debe ser un número' })
  categoryIds: number[];

  // 🏗️ Objeto anidado
  @ApiProperty({
    description: 'Información de la categoría principal',
    type: NestedExampleDto,
  })
  @ValidateNested()
  @Type(() => NestedExampleDto)
  category: NestedExampleDto;

  // 🏗️ Array de objetos anidados
  @ApiProperty({
    description: 'Lista de subcategorías',
    type: [NestedExampleDto],
    isArray: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => NestedExampleDto)
  subcategories: NestedExampleDto[];
}

// DTO de actualización (extiende del de creación pero todo opcional)
export class UpdateExampleDto {
  @ApiPropertyOptional({
    description: 'Nombre del recurso',
    example: 'Mi Evento Actualizado',
    minLength: 3,
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @Length(3, 100)
  name?: string;

  @ApiPropertyOptional({
    description: 'Correo electrónico del usuario',
    example: 'nuevo@ejemplo.com',
    format: 'email',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    description: 'Edad del usuario',
    example: 30,
    minimum: 18,
    maximum: 99,
  })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 0 })
  @Min(18)
  @Max(99)
  age?: number;

  // ... otros campos opcionales
}

// DTO de respuesta
export class ExampleResponseDto {
  @ApiProperty({
    description: 'ID único del recurso',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Nombre del recurso',
    example: 'Mi Evento Increíble',
  })
  name: string;

  @ApiProperty({
    description: 'Correo electrónico',
    example: 'usuario@ejemplo.com',
  })
  email: string;

  @ApiProperty({
    description: 'Fecha de creación',
    example: '2024-01-15T10:30:00Z',
    type: 'string',
    format: 'date-time',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Fecha de última actualización',
    example: '2024-01-15T12:45:00Z',
    type: 'string',
    format: 'date-time',
  })
  updatedAt: Date;
}

// DTO para respuestas paginadas
export class PaginatedResponseDto<T> {
  @ApiProperty({
    description: 'Lista de elementos',
    isArray: true,
  })
  data: T[];

  @ApiProperty({
    description: 'Información de paginación',
    type: 'object',
    properties: {
      total: { type: 'number', example: 100 },
      page: { type: 'number', example: 1 },
      limit: { type: 'number', example: 10 },
      totalPages: { type: 'number', example: 10 },
    },
  })
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

/**
 * 🚀 DECORADORES MÁS UTILIZADOS:
 * 
 * @ApiProperty() - Propiedad obligatoria
 * @ApiPropertyOptional() - Propiedad opcional
 * 
 * Opciones comunes:
 * - description: Descripción del campo
 * - example: Valor de ejemplo
 * - type: Tipo de dato
 * - format: Formato específico (email, date-time, etc.)
 * - minimum/maximum: Valores mínimo/máximo para números
 * - minLength/maxLength: Longitud mínima/máxima para strings
 * - pattern: Expresión regular para validación
 * - enum: Lista de valores permitidos
 * - isArray: Indica si es un array
 * - default: Valor por defecto
 */
