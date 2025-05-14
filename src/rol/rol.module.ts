import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolService } from './rol.service';
import { RolController } from './rol.controller';
import { Rol } from './entities/rol.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rol])],
  controllers: [RolController],
  providers: [RolService],
  exports: [TypeOrmModule]
})
export class RolModule {}
