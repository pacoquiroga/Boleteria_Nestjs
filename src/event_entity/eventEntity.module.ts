import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEntityService } from './eventEntity.service';
import { EventEntityController } from './eventEntity.controller';
import { EventEntity } from './entities/eventEntity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EventEntity])],
  controllers: [EventEntityController],
  providers: [EventEntityService],
  exports: [TypeOrmModule]
})
export class EventEntityModule {}
