import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RoleType } from '../enums/enums';

export class CreateRolDto {
  @ApiProperty({
    description: 'Tipo de rol en el sistema',
    enum: RoleType,
    example: RoleType.USER,
    enumName: 'RoleType',
  })
  @IsNotEmpty({ message: 'El rol es requerido' })
  @IsEnum(RoleType, {
    message: `El rol debe ser uno de los siguientes valores: ${Object.values(RoleType).join(', ')}`,
  })
  rolName: RoleType;

  @ApiProperty({
    description: 'Descripción detallada del rol y sus permisos',
    example: 'Usuario con permisos básicos para comprar tickets',
    type: 'string',
    maxLength: 200,
  })
  @IsString({ message: 'La descripción del rol debe ser un texto' })
  rolDescription: string;
}
