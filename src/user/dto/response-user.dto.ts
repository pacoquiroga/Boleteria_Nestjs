import { ApiProperty } from '@nestjs/swagger';
import { RoleType } from '../../rol/enums/enums';

export class ResponseUserDto {
  @ApiProperty({
    description: 'ID único del usuario',
    example: 1,
    type: 'number',
  })
  id: number;

  @ApiProperty({
    description: 'Nombre del usuario',
    example: 'Juan',
    type: 'string',
  })
  name: string;

  @ApiProperty({
    description: 'Apellido del usuario',
    example: 'Pérez',
    type: 'string',
  })
  lastname: string;

  @ApiProperty({
    description: 'Nombre de usuario único para el login',
    example: 'juanperez',
    type: 'string',
  })
  username: string;

  @ApiProperty({
    description: 'Correo electrónico del usuario',
    example: 'juan.perez@email.com',
    type: 'string',
    format: 'email',
  })
  email: string;

  @ApiProperty({
    description: 'Número telefónico del usuario',
    example: '1234567890',
    type: 'string',
  })
  phone: string;

  @ApiProperty({
    description: 'Rol del usuario en el sistema',
    enum: RoleType,
    example: RoleType.USER,
    enumName: 'RoleType',
  })
  rol: RoleType;

  @ApiProperty({
    description: 'Fecha y hora del último inicio de sesión',
    example: '2024-01-15T10:30:00.000Z',
    type: 'string',
    format: 'date-time',
    nullable: true,
  })
  lastLogin: Date | null;

  @ApiProperty({
    description: 'Fecha de creación del registro',
    example: '2024-01-15T10:30:00.000Z',
    type: 'string',
    format: 'date-time',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Fecha de última actualización del registro',
    example: '2024-01-20T14:45:00.000Z',
    type: 'string',
    format: 'date-time',
  })
  updatedAt: Date;
}
