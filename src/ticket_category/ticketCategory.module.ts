import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketCategoryService } from './ticketCategory.service';
import { TicketCategoryController } from './ticketCategory.controller';
import { TicketCategory } from './entities/ticketCategory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TicketCategory])],
  controllers: [TicketCategoryController],
  providers: [TicketCategoryService],
  exports: [TypeOrmModule]
})
export class TicketCategoryModule {}
