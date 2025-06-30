import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  MinLength,
  IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RoleType } from '../../rol/enums/enums';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nombre del usuario',
    example: 'Juan',
    minLength: 2,
    maxLength: 30,
    type: 'string',
  })
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @IsString({ message: 'El nombre debe ser un texto' })
  @Length(2, 30, { message: 'El nombre debe tener entre 2 y 30 caracteres' })
  name: string;

  @ApiProperty({
    description: 'Apellido del usuario',
    example: 'Pérez',
    minLength: 2,
    maxLength: 30,
    type: 'string',
  })
  @IsNotEmpty({ message: 'El apellido es requerido' })
  @IsString({ message: 'El apellido debe ser un texto' })
  @Length(2, 30, { message: 'El apellido debe tener entre 2 y 30 caracteres' })
  lastname: string;

  @ApiProperty({
    description: 'Nombre de usuario único para el login',
    example: 'juanperez',
    minLength: 2,
    maxLength: 30,
    type: 'string',
  })
  @IsNotEmpty({ message: 'El nombre de usuario es requerido' })
  @IsString({ message: 'El nombre de usuario debe ser un texto' })
  @Length(2, 30, {
    message: 'El nombre de usuario debe tener entre 2 y 30 caracteres',
  })
  username: string;

  @ApiProperty({
    description: 'Correo electrónico del usuario',
    example: 'juan.perez@email.com',
    format: 'email',
    type: 'string',
  })
  @IsNotEmpty({ message: 'El correo electrónico es requerido' })
  @IsEmail({}, { message: 'Formato de correo electrónico inválido' })
  email: string;

  @ApiProperty({
    description: 'Contraseña del usuario',
    example: 'miPassword123',
    minLength: 6,
    type: 'string',
    format: 'password',
  })
  @IsNotEmpty({ message: 'La contraseña es requerida' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;

  @ApiProperty({
    description: 'Número telefónico del usuario',
    example: '1234567890',
    minLength: 10,
    maxLength: 10,
    type: 'string',
  })
  @IsNotEmpty({ message: 'El número telefónico es requerido' })
  @Length(10, 10, { message: 'El número telefónico debe tener 10 caracteres' })
  phone: string;

  @ApiProperty({
    description: 'Rol del usuario en el sistema',
    enum: RoleType,
    example: RoleType.USER,
    enumName: 'RoleType',
  })
  @IsNotEmpty({ message: 'El rol es requerido' })
  @IsEnum(RoleType, {
    message: `El rol debe ser uno de los siguientes valores: ${Object.values(RoleType).join(', ')}`,
  })
  rol: RoleType;
}
