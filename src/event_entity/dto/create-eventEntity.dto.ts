import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsDateString,
  Matches,
} from 'class-validator';
import { EventState } from '../enums/event-state.enum';

export class CreateEventEntityDto {
  @IsNotEmpty({ message: 'El nombre del evento es requerido' })
  @IsString({ message: 'El nombre del evento debe ser un texto' })
  name: string;

  @IsNotEmpty({ message: 'La fecha del evento es requerida' })
  @IsDateString({}, { message: 'La fecha debe tener un formato válido' })
  date: Date;

  @IsNotEmpty({ message: 'La hora del evento es requerida' })
  @Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'La hora debe tener un formato válido (HH:MM)',
  })
  hour: string;

  @IsNotEmpty({ message: 'La locación del evento es requerida' })
  @IsString({ message: 'La locación del evento debe ser un texto' })
  location: string;

  @IsNotEmpty({ message: 'La ciudad del evento es requerida' })
  @IsString({ message: 'La ciudad del evento debe ser un texto' })
  city: string;

  @IsOptional()
  @IsString({ message: 'La descripción del evento debe ser un texto' })
  description: string;

  @IsNotEmpty({ message: 'La capacidad del evento es requerida' })
  @IsNumber(
    {
      maxDecimalPlaces: 0,
    },
    { message: 'La capacidad del evento debe ser un número entero' },
  )
  capacity: number;

  @IsNotEmpty({ message: 'El estado del evento es requerido' })
  @IsEnum(EventState, {
    message: `El estado del evento debe ser uno de los siguientes: ${Object.values(EventState).join(', ')}`,
  })
  state: EventState;

  @IsNotEmpty({ message: 'El usuario es requerido' })
  @IsNumber(
    {
      maxDecimalPlaces: 0,
    },
    { message: 'El ID del usuario debe ser un número entero' },
  )
  idUser: number;
}
