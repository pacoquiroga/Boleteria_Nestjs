import { Body, Controller, HttpException, HttpStatus, Logger, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { first, firstValueFrom } from 'rxjs';
import { Auth } from 'typeorm';
import { AuthToken } from './types.d/auth.interface';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('/signup')
  @UsePipes(new ValidationPipe({ transform: true }))
  async signup(
    @Body() userCreateDto: CreateUserDto,
  ): Promise<{ access_token: string }> {
    try {
      const result = await this.authService.signup(userCreateDto);
      console.log('User created:', result);
      return result;
    } catch (error) {
      this.logger.error('Signup error: ', error);
      throw new HttpException(error.message || "User registration failed", error.status || HttpStatus.BAD_REQUEST);
    }
  }
}
