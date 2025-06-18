import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';

class TicketCategoryRequest {
  @IsNotEmpty()
  @IsNumber({}, { message: 'El ID de la categoría debe ser un número' })
  ticketCategoryId: number;

  @IsNotEmpty()
  @IsNumber({}, { message: 'La cantidad debe ser un número' })
  quantity: number;
}

export class CreateTransactionTicketRequestDto {
  @IsNumber({}, { message: 'El ID de la transacción debe ser un número' })
  @IsNotEmpty()
  idTransaction: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TicketCategoryRequest)
  ticketCategoryRequests: TicketCategoryRequest[];
}
