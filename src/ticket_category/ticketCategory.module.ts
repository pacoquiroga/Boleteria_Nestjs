import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketCategoryService } from './ticketCategory.service';
import { TicketCategoryController } from './ticketCategory.controller';
import { TicketCategory } from './entities/ticketCategory.entity';
import { EventEntityModule } from 'src/event_entity/eventEntity.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TicketCategory]),
    EventEntityModule
  ],
  controllers: [TicketCategoryController],
  providers: [TicketCategoryService],
  exports: [TypeOrmModule, TicketCategoryService]
})
export class TicketCategoryModule {}
