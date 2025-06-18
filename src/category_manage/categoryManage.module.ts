import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryManageService } from './categoryManage.service';
import { CategoryManageController } from './categoryManage.controller';
import { CategoryManage } from './entities/categoryManage.entity';
import { EventCategory } from '../event_category/entities/eventCategory.entity';
import { EventEntity } from '../event_entity/entities/eventEntity.entity';
import { EventEntityModule } from '../event_entity/eventEntity.module';
import { EventCategoryModule } from '../event_category/eventCategory.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoryManage, EventCategory, EventEntity]),
    forwardRef(() => EventEntityModule),
    EventCategoryModule,
  ],
  controllers: [CategoryManageController],
  providers: [CategoryManageService],
  exports: [TypeOrmModule, CategoryManageService],
})
export class CategoryManageModule {}
