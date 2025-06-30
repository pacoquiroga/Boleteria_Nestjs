import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Logger,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { AuthResponseDto, ErrorResponseDto } from './dto/auth-response.dto';
import { first, firstValueFrom } from 'rxjs';
import { Auth } from 'typeorm';
import { AuthToken } from './types.d/auth.interface';

@ApiTags('🔐 Autenticación')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @ApiOperation({
    summary: 'Registro de nuevo usuario',
    description: 'Registra un nuevo usuario en el sistema y retorna un token de acceso',
  })
  @ApiBody({
    type: CreateUserDto,
    description: 'Datos del usuario a registrar',
    examples: {
      usuario_normal: {
        summary: 'Usuario normal',
        description: 'Ejemplo de registro de un usuario regular',
        value: {
          name: 'Juan',
          lastname: 'Pérez',
          username: 'juanperez',
          email: 'juan.perez@email.com',
          password: 'miPassword123',
          phone: '1234567890',
          rol: 'user'
        }
      },
      organizador: {
        summary: 'Organizador de eventos',
        description: 'Ejemplo de registro de un organizador',
        value: {
          name: 'María',
          lastname: 'González',
          username: 'mariagonzalez',
          email: 'maria.gonzalez@eventos.com',
          password: 'eventosPro456',
          phone: '9876543210',
          rol: 'organizer'
        }
      }
    }
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Usuario registrado exitosamente',
    schema: {
      type: 'object',
      properties: {
        access_token: {
          type: 'string',
          example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
          description: 'Token JWT de acceso',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Datos de entrada inválidos',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { 
          oneOf: [
            { type: 'string', example: 'El email ya está registrado' },
            { type: 'array', items: { type: 'string' }, example: ['El email es obligatorio', 'El password debe tener mínimo 6 caracteres'] }
          ]
        },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'El usuario ya existe',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 409 },
        message: { type: 'string', example: 'El email ya está registrado' },
        error: { type: 'string', example: 'Conflict' },
      },
    },
  })
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
      throw new HttpException(
        error.message || 'User registration failed',
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }


  @Post('/login')
  @ApiOperation({
    summary: 'Iniciar sesión',
    description: `
      Autentica un usuario con sus credenciales y retorna un token JWT junto con la información del usuario.
      
      **Credenciales:**
      - username: Nombre de usuario o email
      - password: Contraseña del usuario
      
      **El token JWT debe ser incluido en las siguientes peticiones usando el header:**
      \`Authorization: Bearer <token>\`
    `,
  })
  @ApiBody({
    type: LoginDto,
    description: 'Credenciales de acceso del usuario',
    examples: {
      login_username: {
        summary: 'Login con username',
        description: 'Iniciar sesión usando nombre de usuario',
        value: {
          username: 'juanperez',
          password: 'miPassword123'
        }
      },
      login_email: {
        summary: 'Login con email',
        description: 'Iniciar sesión usando correo electrónico',
        value: {
          username: 'juan.perez@email.com',
          password: 'miPassword123'
        }
      }
    }
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Login exitoso',
    type: AuthResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Datos de entrada inválidos',
    type: ErrorResponseDto,
    examples: {
      validation_error: {
        summary: 'Error de validación',
        value: {
          statusCode: 400,
          message: [
            'El nombre de usuario es requerido',
            'La contraseña debe tener al menos 6 caracteres'
          ],
          error: 'Bad Request'
        }
      }
    }
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Credenciales inválidas',
    type: ErrorResponseDto,
    examples: {
      invalid_credentials: {
        summary: 'Credenciales incorrectas',
        value: {
          statusCode: 401,
          message: 'Credenciales inválidas',
          error: 'Unauthorized'
        }
      },
      user_not_found: {
        summary: 'Usuario no encontrado',
        value: {
          statusCode: 401,
          message: 'Usuario no encontrado',
          error: 'Unauthorized'
        }
      }
    }
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  async login(@Body() loginDto: LoginDto): Promise<AuthToken> {
    console.log('Login attempt:', loginDto);
    try {
      const result = await this.authService.login(loginDto);
      console.log('Login successful:', result);
      return result;
    } catch (error) {
      this.logger.error('Login error: ', error);
      throw new HttpException(
        error.message || 'Login failed',
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
