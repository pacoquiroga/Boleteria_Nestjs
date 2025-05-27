import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCategoryManageDto {
  @IsNotEmpty({ message: 'El id del evento es requerido' })
  @IsNumber(
    {
      maxDecimalPlaces: 0,
    },
    { message: 'El id del evento debe ser un número entero' },
  )
  idEventCategory: number;

  @IsNotEmpty({ message: 'El id de la entidad del evento es requerido' })
  @IsNumber(
    {
      maxDecimalPlaces: 0,
    },
    { message: 'El id del evento debe ser un número entero' },
  )
  idEventEntity: number;
}
