export interface IPaginationRequest<T> {
  page: number;
  rowsPage: number;
  filter: Partial<T> | Partial<T>[];
  orderBy: keyof T;
  order: 'ASC' | 'DESC';
  fields: (keyof T)[];
}

export interface IPaginationResponse<T> {
  data: T[];
  count: number;
  page: number;
  rowsPage: number;
}
