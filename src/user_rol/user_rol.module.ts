import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRolService } from './user_rol.service';
import { UserRolController } from './user_rol.controller';
import { UserRol } from './entities/user_rol.entity';
import { RolModule } from '../rol/rol.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRol]),
    RolModule,
    forwardRef(() => UserModule), // Usar forwardRef aquí
  ],
  controllers: [UserRolController],
  providers: [UserRolService],
  exports: [UserRolService],
})
export class UserRolModule {}
