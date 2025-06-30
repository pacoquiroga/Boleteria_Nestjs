import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryManageDto {
  @ApiProperty({
    description: 'ID único de la categoría de evento',
    example: 1,
    type: 'number',
    minimum: 1,
  })
  @IsNotEmpty({ message: 'El id del evento es requerido' })
  @IsNumber(
    {
      maxDecimalPlaces: 0,
    },
    { message: 'El id del evento debe ser un número entero' },
  )
  idEventCategory: number;

  @ApiProperty({
    description: 'ID único de la entidad del evento',
    example: 1,
    type: 'number',
    minimum: 1,
  })
  @IsNotEmpty({ message: 'El id de la entidad del evento es requerido' })
  @IsNumber(
    {
      maxDecimalPlaces: 0,
    },
    { message: 'El id del evento debe ser un número entero' },
  )
  idEventEntity: number;
}
