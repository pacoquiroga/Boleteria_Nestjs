import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TransactionTicketRequestService } from './transaction_ticket_request.service';
import { CreateTransactionTicketRequestDto } from './dto/create-transaction_ticket_request.dto';
import { UpdateTransactionTicketRequestDto } from './dto/update-transaction_ticket_request.dto';

@Controller('transaction-ticket-request')
export class TransactionTicketRequestController {
  constructor(
    private readonly transactionTicketRequestService: TransactionTicketRequestService,
  ) {}

  @Post()
  create(
    @Body()
    createTransactionTicketRequestDto: CreateTransactionTicketRequestDto,
  ) {
    return this.transactionTicketRequestService.create(
      createTransactionTicketRequestDto,
    );
  }

  @Get()
  findAll() {
    return this.transactionTicketRequestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionTicketRequestService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    updateTransactionTicketRequestDto: UpdateTransactionTicketRequestDto,
  ) {
    return this.transactionTicketRequestService.update(
      +id,
      updateTransactionTicketRequestDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionTicketRequestService.remove(+id);
  }
}
