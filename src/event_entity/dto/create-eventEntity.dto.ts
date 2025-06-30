import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsDateString,
  Matches,
  ValidateNested,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EventState } from '../enums/event-state.enum';
import { Type } from 'class-transformer';
import { Point } from 'geojson';

class PointDto {
  @ApiProperty({
    description: 'Tipo de geometría GeoJSON',
    example: 'Point',
    enum: ['Point'],
  })
  @IsString()
  type: 'Point';

  @ApiProperty({
    description: 'Coordenadas de longitud y latitud',
    example: [-74.0060, 40.7128],
    type: 'array',
    items: { type: 'number' },
    minItems: 2,
    maxItems: 2,
  })
  @IsNumber({}, { each: true })
  coordinates: [number, number];
}

export class CreateEventEntityDto {
  @ApiProperty({
    description: 'Nombre del evento',
    example: 'Concierto de Rock 2024',
    type: 'string',
    minLength: 1,
    maxLength: 200,
  })
  @IsNotEmpty({ message: 'El nombre del evento es requerido' })
  @IsString({ message: 'El nombre del evento debe ser un texto' })
  name: string;

  @ApiProperty({
    description: 'Fecha del evento',
    example: '2024-07-15',
    type: 'string',
    format: 'date',
  })
  @IsNotEmpty({ message: 'La fecha del evento es requerida' })
  @IsDateString({}, { message: 'La fecha debe tener un formato válido' })
  date: Date;

  @ApiProperty({
    description: 'Hora de inicio del evento en formato HH:MM',
    example: '20:00',
    type: 'string',
    pattern: '^([01]?[0-9]|2[0-3]):[0-5][0-9]$',
  })
  @IsNotEmpty({ message: 'La hora del evento es requerida' })
  @Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'La hora debe tener un formato válido (HH:MM)',
  })
  hour: string;

  @ApiProperty({
    description: 'Ubicación geográfica del evento usando coordenadas GeoJSON',
    type: PointDto,
    example: {
      type: 'Point',
      coordinates: [-74.0060, 40.7128]
    }
  })
  @IsNotEmpty({ message: 'La locación del evento es requerida' })
  @ValidateNested()
  @Type(() => PointDto)
  location: PointDto;

  @ApiProperty({
    description: 'Ciudad donde se realiza el evento',
    example: 'Nueva York',
    type: 'string',
    maxLength: 100,
  })
  @IsNotEmpty({ message: 'La ciudad del evento es requerida' })
  @IsString({ message: 'La ciudad del evento debe ser un texto' })
  city: string;

  @ApiPropertyOptional({
    description: 'Descripción detallada del evento',
    example: 'Gran concierto de rock con las mejores bandas del año',
    type: 'string',
    maxLength: 1000,
  })
  @IsOptional()
  @IsString({ message: 'La descripción del evento debe ser un texto' })
  description: string;

  @ApiProperty({
    description: 'Capacidad máxima de asistentes al evento',
    example: 5000,
    type: 'integer',
    minimum: 1,
    maximum: 100000,
  })
  @IsNotEmpty({ message: 'La capacidad del evento es requerida' })
  @IsNumber(
    {
      maxDecimalPlaces: 0,
    },
    { message: 'La capacidad del evento debe ser un número entero' },
  )
  capacity: number;

  @ApiProperty({
    description: 'Estado actual del evento',
    enum: EventState,
    example: EventState.ACTIVE,
    enumName: 'EventState',
  })
  @IsNotEmpty({ message: 'El estado del evento es requerido' })
  @IsEnum(EventState, {
    message: `El estado del evento debe ser uno de los siguientes: ${Object.values(EventState).join(', ')}`,
  })
  state: EventState;

  @ApiProperty({
    description: 'ID del usuario organizador del evento',
    example: 1,
    type: 'integer',
    minimum: 1,
  })
  @IsNotEmpty({ message: 'El usuario es requerido' })
  @IsNumber(
    {
      maxDecimalPlaces: 0,
    },
    { message: 'El ID del usuario debe ser un número entero' },
  )
  idUser: number;
}
