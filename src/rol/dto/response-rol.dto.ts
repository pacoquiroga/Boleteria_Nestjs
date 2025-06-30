import { ApiProperty } from '@nestjs/swagger';

export class ResponseRolDto {
  @ApiProperty({
    description: 'ID único del rol',
    example: 1,
    type: 'number',
  })
  id: number;

  @ApiProperty({
    description: 'Nombre del rol',
    example: 'Administrador',
    type: 'string',
  })
  rolName: string;

  @ApiProperty({
    description: 'Descripción detallada del rol',
    example: 'Rol con permisos completos para administrar el sistema',
    type: 'string',
  })
  rolDescription: string;
}
