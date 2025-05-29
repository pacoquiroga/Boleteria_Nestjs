import { IsNumber, IsObject, IsString } from 'class-validator';
import { IPaginationRequest } from '../interfaces/pagination.interface';

export abstract class PaginationRequest<T> implements IPaginationRequest<T> {
  @IsNumber({}, { message: 'La página debe ser un número' })
  page: number;

  @IsNumber({}, { message: 'El número de filas por página debe ser un número' })
  rowsPage: number;

  @IsObject({ message: 'Los filtros deben ser un objeto' })
  filter: Partial<T> | Partial<T>[];

  @IsString({ message: 'El orden debe ser una cadena de texto' })
  order: 'ASC' | 'DESC';
} 