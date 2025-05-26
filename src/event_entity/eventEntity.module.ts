import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEntityService } from './eventEntity.service';
import { EventEntityController } from './eventEntity.controller';
import { EventEntity } from './entities/eventEntity.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([EventEntity]), UserModule],
  controllers: [EventEntityController],
  providers: [EventEntityService],
  exports: [TypeOrmModule],
})
export class EventEntityModule {}
