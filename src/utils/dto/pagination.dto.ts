import {
  IsArray,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsEnum,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IPaginationRequest } from '../interfaces/pagination.interface';

enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class PaginationRequest<T> implements IPaginationRequest<T> {
  @ApiPropertyOptional({
    description: 'Número de página a consultar',
    example: 1,
    type: 'integer',
    minimum: 1,
    default: 1,
  })
  @IsNumber({}, { message: 'La página debe ser un número' })
  @IsOptional()
  page: number = 1;

  @ApiPropertyOptional({
    description: 'Cantidad de elementos por página',
    example: 10,
    type: 'integer',
    minimum: 1,
    maximum: 1000,
    default: 1000,
  })
  @IsNumber({}, { message: 'Las filas por página deben ser un número' })
  @IsOptional()
  rowsPage: number = 1000;

  @ApiPropertyOptional({
    description: 'Filtros a aplicar en la consulta',
    example: { name: 'Concierto', state: 'active' },
  })
  @IsObject({ message: 'Los filtros deben ser un objeto' })
  @IsOptional()
  filter: Partial<T> | Partial<T>[] = {};

  @ApiPropertyOptional({
    description: 'Campo por el cual ordenar los resultados',
    example: 'id',
    type: 'string',
    default: 'id',
  })
  @IsString({ message: 'El campo de ordenación debe ser una cadena de texto' })
  @IsOptional()
  orderBy: keyof T = 'id' as keyof T;

  @ApiPropertyOptional({
    description: 'Dirección del ordenamiento',
    enum: SortOrder,
    example: SortOrder.ASC,
    default: SortOrder.ASC,
    enumName: 'SortOrder',
  })
  @IsEnum(SortOrder, { message: 'El orden debe ser ASC o DESC' })
  @IsOptional()
  order: 'ASC' | 'DESC' = 'ASC';

  @ApiPropertyOptional({
    description: 'Campos específicos a incluir en la respuesta',
    type: 'array',
    items: { type: 'string' },
    example: ['id', 'name', 'date'],
  })
  @IsArray({ message: 'Los campos deben ser un array' })
  @IsOptional()
  fields: (keyof T)[] = [] as (keyof T)[];
}
