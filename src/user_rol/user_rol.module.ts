import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRolService } from './user_rol.service';
import { UserRolController } from './user_rol.controller';
import { UserRol } from './entities/user_rol.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserRol])],
  controllers: [UserRolController],
  providers: [UserRolService],
  exports: [TypeOrmModule]
})
export class UserRolModule {}
