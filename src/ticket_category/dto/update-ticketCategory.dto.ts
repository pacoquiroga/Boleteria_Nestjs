import { PartialType } from '@nestjs/mapped-types';
import { CreateTicketCategoryDto } from './create-ticketCategory.dto';

export class UpdateTicketCategoryDto extends PartialType(
  CreateTicketCategoryDto,
) {}
