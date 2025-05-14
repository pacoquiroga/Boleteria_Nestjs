import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { RolModule } from 'src/rol/rol.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    UserModule,
    RolModule,
    PassportModule,
    JwtModule.register({
      secret: 'epale', 
      signOptions: { expiresIn: '1h' }, 
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
