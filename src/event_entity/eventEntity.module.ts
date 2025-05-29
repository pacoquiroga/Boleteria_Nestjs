import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEntityService } from './eventEntity.service';
import { EventEntityController } from './eventEntity.controller';
import { EventEntity } from './entities/eventEntity.entity';
import { UserModule } from 'src/user/user.module';
import { CategoryManageModule } from 'src/category_manage/categoryManage.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([EventEntity]), 
    UserModule,
    forwardRef(() => CategoryManageModule)
  ],
  controllers: [EventEntityController],
  providers: [EventEntityService],
  exports: [TypeOrmModule, EventEntityService],
})
export class EventEntityModule {}
