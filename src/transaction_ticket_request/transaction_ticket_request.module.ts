import { Module, forwardRef } from '@nestjs/common';
import { TransactionTicketRequestService } from './transaction_ticket_request.service';
import { TransactionTicketRequestController } from './transaction_ticket_request.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionTicketRequest } from './entities/transaction_ticket_request.entity';
import { TransactionModule } from 'src/transaction/transaction.module';
import { TicketCategoryModule } from 'src/ticket_category/ticketCategory.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TransactionTicketRequest]),
    forwardRef(() => TransactionModule),
    TicketCategoryModule, 
  ],
  controllers: [TransactionTicketRequestController],
  providers: [TransactionTicketRequestService],
  exports: [TypeOrmModule, TransactionTicketRequestService]
})
export class TransactionTicketRequestModule {}
