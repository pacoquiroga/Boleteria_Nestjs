import { PartialType } from '@nestjs/mapped-types';
import { CreateTransactionTicketRequestDto } from './create-transaction_ticket_request.dto';

export class UpdateTransactionTicketRequestDto extends PartialType(CreateTransactionTicketRequestDto) {}
