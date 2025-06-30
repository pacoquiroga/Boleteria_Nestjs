import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateEventCategoryDto {
  @ApiProperty({
    description: 'Nombre de la categoría de evento',
    example: 'Conciertos',
    type: 'string',
    minLength: 1,
    maxLength: 100,
  })
  @IsNotEmpty({ message: 'El nombre de la categoría es requerido' })
  @IsString({ message: 'El nombre de la categoría debe ser un texto' })
  name: string;

  @ApiPropertyOptional({
    description: 'Descripción detallada de la categoría de evento',
    example: 'Eventos musicales incluyendo conciertos, recitales y festivales',
    type: 'string',
    maxLength: 500,
  })
  @IsOptional()
  @IsString({ message: 'La descripción de la categoría debe ser un texto' })
  description: string;
}
