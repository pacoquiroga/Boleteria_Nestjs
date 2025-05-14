import {
  IsNotEmpty,
  IsNumber,
  IsDateString,
  IsOptional,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class CreateUserRolDto {
  @IsNotEmpty({ message: 'El ID del rol es requerido' })
  @IsNumber({}, { message: 'El ID del rol debe ser un número' })
  @Type(() => Number)
  idRol: number;

  @IsNotEmpty({ message: 'El ID del usuario es requerido' })
  @IsNumber({}, { message: 'El ID del usuario debe ser un número' })
  @Type(() => Number)
  idUser: number;

  @IsOptional()
  @IsDateString({}, { message: 'La fecha de inicio debe ser una fecha válida' })
  @Transform(({ value }) => (value ? value : new Date().toISOString()))
  since?: Date = new Date();

  @IsOptional()
  @IsDateString({}, { message: 'La fecha de fin debe ser una fecha válida' })
  until?: Date;
}
