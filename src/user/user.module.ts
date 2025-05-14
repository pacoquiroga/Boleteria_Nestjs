import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { Rol } from '../rol/entities/rol.entity';
import { UserRolModule } from '../user_rol/user_rol.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Rol]),
    forwardRef(() => UserRolModule), // Usar forwardRef aquí
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
