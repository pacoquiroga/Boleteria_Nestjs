import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { Rol } from 'src/rol/entities/rol.entity';
import { UserRolModule } from 'src/user_rol/user_rol.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Rol]),
    UserRolModule, 
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService] 
})
export class UserModule {}
