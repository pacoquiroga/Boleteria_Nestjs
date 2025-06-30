import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
  @ApiProperty({
    description: 'Token JWT de acceso',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    type: 'string',
  })
  access_token: string;

  @ApiProperty({
    description: 'Información del usuario autenticado',
    type: 'object',
    properties: {
      id: { type: 'number', example: 1 },
      username: { type: 'string', example: 'juanperez' },
      rol: { type: 'string', example: 'user' },
      name: { type: 'string', example: 'Juan' },
      lastname: { type: 'string', example: 'Pérez' },
      email: { type: 'string', example: 'juan.perez@email.com' },
    },
  })
  user: {
    id: number;
    username: string;
    rol: string;
    name: string;
    lastname: string;
    email: string;
  };
}

export class SignupResponseDto {
  @ApiProperty({
    description: 'Token JWT de acceso para el usuario recién registrado',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    type: 'string',
  })
  access_token: string;
}

export class ErrorResponseDto {
  @ApiProperty({
    description: 'Código de estado HTTP',
    example: 400,
  })
  statusCode: number;

  @ApiProperty({
    description: 'Mensaje de error',
    oneOf: [
      { type: 'string', example: 'Credenciales inválidas' },
      { 
        type: 'array', 
        items: { type: 'string' }, 
        example: ['El email es obligatorio', 'La contraseña debe tener mínimo 6 caracteres'] 
      }
    ],
  })
  message: string | string[];

  @ApiProperty({
    description: 'Tipo de error HTTP',
    example: 'Bad Request',
  })
  error: string;

  @ApiProperty({
    description: 'Timestamp del error',
    example: '2024-01-15T10:30:00Z',
    required: false,
  })
  timestamp?: string;

  @ApiProperty({
    description: 'Path del endpoint que generó el error',
    example: '/auth/login',
    required: false,
  })
  path?: string;
}
