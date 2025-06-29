import { PartialType } from '@nestjs/mapped-types';
import { Ticket } from '../entities/ticket.entity';

export class UpdateTicketDto extends PartialType(Ticket) {}
