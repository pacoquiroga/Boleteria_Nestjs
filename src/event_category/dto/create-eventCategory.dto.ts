import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateEventCategoryDto {
  @IsNotEmpty({ message: 'El nombre de la categoría es requerido' })
  @IsString({ message: 'El nombre de la categoría debe ser un texto' })
  name: string;

  @IsOptional()
  @IsString({ message: 'La descripción de la categoría debe ser un texto' })
  description: string;
}
