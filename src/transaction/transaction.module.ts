import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { Transaction } from './entities/transaction.entity';
import { EventEntityModule } from 'src/event_entity/eventEntity.module';
import { TransactionTicketRequestModule } from 'src/transaction_ticket_request/transaction_ticket_request.module';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction]),
    EventEntityModule,
    forwardRef(() => TransactionTicketRequestModule),
    MailModule,
  ],
  controllers: [TransactionController],
  providers: [TransactionService],
  exports: [TypeOrmModule, TransactionService],
})
export class TransactionModule {}
