import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { Ticket } from './entities/ticket.entity';
import { TicketCategoryModule } from '../ticket_category/ticketCategory.module';
import { TransactionModule } from '../transaction/transaction.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ticket]),
    forwardRef(() => TicketCategoryModule),
    forwardRef(() => TransactionModule),
  ],
  controllers: [TicketController],
  providers: [TicketService],
  exports: [TypeOrmModule, TicketService]
})
export class TicketModule {}
