import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventCategoryService } from './eventCategory.service';
import { EventCategoryController } from './eventCategory.controller';
import { EventCategory } from './entities/eventCategory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EventCategory])],
  controllers: [EventCategoryController],
  providers: [EventCategoryService],
  exports: [TypeOrmModule, EventCategoryService],
})
export class EventCategoryModule {}
