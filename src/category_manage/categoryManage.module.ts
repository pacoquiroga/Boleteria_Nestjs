import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryManageService } from './categoryManage.service';
import { CategoryManageController } from './categoryManage.controller';
import { CategoryManage } from './entities/categoryManage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryManage])],
  controllers: [CategoryManageController],
  providers: [CategoryManageService],
  exports: [TypeOrmModule]
})
export class CategoryManageModule {}
