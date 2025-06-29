import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTicketDto {
  @IsNotEmpty()
  @IsNumber(
    {},
    { message: 'El ID de la categoría de ticket debe ser un número' },
  )
  ticketCategoryId: number;

  @IsNotEmpty()
  @IsNumber({}, { message: 'El ID de la transacción debe ser un número' })
  transactionId: number;
}
