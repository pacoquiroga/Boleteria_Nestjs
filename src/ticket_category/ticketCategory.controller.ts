import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TicketCategoryService } from './ticketCategory.service';
import { CreateTicketCategoryDto } from './dto/create-ticketCategory.dto';
import { UpdateTicketCategoryDto } from './dto/update-ticketCategory.dto';

@Controller('ticket-category')
export class TicketCategoryController {
  constructor(private readonly ticketCategoryService: TicketCategoryService) {}

  @Post()
  createMultipleTicketCategories(
    @Body() createTicketCategoriesDtos: CreateTicketCategoryDto[],
  ) {
    return this.ticketCategoryService.createMultiple(
      createTicketCategoriesDtos,
    );
  }

  @Get(':eventId')
  findAllTicketCategoriesFromEvent(@Param('eventId') eventId: string) {
    return this.ticketCategoryService.findAllTicketCategoriesFromEvent(
      +eventId,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketCategoryService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTicketCategoryDto: UpdateTicketCategoryDto,
  ) {
    return this.ticketCategoryService.update(+id, updateTicketCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketCategoryService.remove(+id);
  }
}
