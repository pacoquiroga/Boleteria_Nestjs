import {
  IsNotEmpty,
  IsNumber,
  IsDateString,
  IsOptional,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type, Transform } from 'class-transformer';

export class CreateUserRolDto {
  @ApiProperty({
    description: 'ID del rol a asignar al usuario',
    example: 1,
    type: 'integer',
    minimum: 1,
  })
  @IsNotEmpty({ message: 'El ID del rol es requerido' })
  @IsNumber({}, { message: 'El ID del rol debe ser un número' })
  @Type(() => Number)
  idRol: number;

  @ApiProperty({
    description: 'ID del usuario al que se asigna el rol',
    example: 1,
    type: 'integer',
    minimum: 1,
  })
  @IsNotEmpty({ message: 'El ID del usuario es requerido' })
  @IsNumber({}, { message: 'El ID del usuario debe ser un número' })
  @Type(() => Number)
  idUser: number;

  @ApiPropertyOptional({
    description: 'Fecha de inicio de vigencia del rol',
    example: '2024-07-15',
    type: 'string',
    format: 'date',
  })
  @IsOptional()
  @IsDateString({}, { message: 'La fecha de inicio debe ser una fecha válida' })
  @Transform(({ value }) => (value ? value : new Date().toISOString()))
  since?: Date = new Date();

  @ApiPropertyOptional({
    description: 'Fecha de fin de vigencia del rol (opcional)',
    example: '2024-12-31',
    type: 'string',
    format: 'date',
  })
  @IsOptional()
  @IsDateString({}, { message: 'La fecha de fin debe ser una fecha válida' })
  until?: Date;
}
