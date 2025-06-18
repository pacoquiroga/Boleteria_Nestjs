import {
  IsArray,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { IPaginationRequest } from '../interfaces/pagination.interface';

export class PaginationRequest<T> implements IPaginationRequest<T> {
  @IsNumber({}, { message: 'La página debe ser un número' })
  @IsOptional()
  page: number = 1;

  @IsNumber({}, { message: 'Las filas por página deben ser un número' })
  @IsOptional()
  rowsPage: number = 1000;

  @IsObject({ message: 'Los filtros deben ser un objeto' })
  @IsOptional()
  filter: Partial<T> | Partial<T>[] = {};

  @IsString({ message: 'El campo de ordenación debe ser una cadena de texto' })
  @IsOptional()
  orderBy: keyof T = 'id' as keyof T;

  @IsString({ message: 'El orden debe ser una cadena de texto' })
  @IsOptional()
  order: 'ASC' | 'DESC' = 'ASC';

  @IsArray({ message: 'Los campos deben ser un array' })
  @IsOptional()
  fields: (keyof T)[] = [] as (keyof T)[];
}
