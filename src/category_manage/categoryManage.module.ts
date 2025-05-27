import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryManageService } from './categoryManage.service';
import { CategoryManageController } from './categoryManage.controller';
import { CategoryManage } from './entities/categoryManage.entity';
import { EventCategoryModule } from '../event_category/eventCategory.module';
import { EventEntityModule } from '../event_entity/eventEntity.module';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryManage]), EventCategoryModule, EventEntityModule],
  controllers: [CategoryManageController],
  providers: [CategoryManageService],
  exports: [TypeOrmModule]
})
export class CategoryManageModule {}
