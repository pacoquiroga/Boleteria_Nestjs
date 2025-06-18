export interface IPaginationRequest<T> {
  page: number;
  rowsPage: number;
  filter: Partial<T> | Partial<T>[];
  order: 'ASC' | 'DESC';
}

export interface IPaginationResponse<T> {
  data: T[];
  count: number;
  page: number;
  rowsPage: number;
}
