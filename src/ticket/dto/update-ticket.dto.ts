import { PartialType } from '@nestjs/mapped-types';
import { CreateTicketDto } from './create-ticket.dto';
import { Ticket } from '../entities/ticket.entity';

export class UpdateTicketDto extends PartialType(Ticket) {}
