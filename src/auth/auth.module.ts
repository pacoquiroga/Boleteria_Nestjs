import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { RolModule } from 'src/rol/rol.module'; // Import RolModule
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    UserModule,
    RolModule, 
    JwtModule.register({
      // Your JWT configuration
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
