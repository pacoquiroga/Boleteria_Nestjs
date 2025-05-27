import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  MinLength,
  IsEnum,
} from 'class-validator';
import { RoleType } from '../../rol/enums/enums';

export class CreateUserDto {
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @IsString({ message: 'El nombre debe ser un texto' })
  @Length(2, 30, { message: 'El nombre debe tener entre 2 y 30 caracteres' })
  name: string;

  @IsNotEmpty({ message: 'El apellido es requerido' })
  @IsString({ message: 'El apellido debe ser un texto' })
  @Length(2, 30, { message: 'El apellido debe tener entre 2 y 30 caracteres' })
  lastname: string;

  @IsNotEmpty({ message: 'El nombre de usuario es requerido' })
  @IsString({ message: 'El nombre de usuario debe ser un texto' })
  @Length(2, 30, {
    message: 'El nombre de usuario debe tener entre 2 y 30 caracteres',
  })
  username: string;

  @IsNotEmpty({ message: 'El correo electrónico es requerido' })
  @IsEmail({}, { message: 'Formato de correo electrónico inválido' })
  email: string;

  @IsNotEmpty({ message: 'La contraseña es requerida' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;

  @IsNotEmpty({ message: 'El número telefónico es requerido' })
  @Length(10, 10, { message: 'El número telefónico debe tener 10 caracteres' })
  phone: string;

  @IsNotEmpty({ message: 'El rol es requerido' })
  @IsEnum(RoleType, {
    message: `El rol debe ser uno de los siguientes valores: ${Object.values(RoleType).join(', ')}`,
  })
  rol: RoleType;
}
