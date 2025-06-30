import { ApiProperty } from '@nestjs/swagger';

export class ResponseUserRolDto {
  @ApiProperty({
    description: 'ID único de la asignación de rol',
    example: 1,
    type: 'number',
  })
  id: number;

  @ApiProperty({
    description: 'Fecha desde cuando el usuario tiene este rol',
    example: '2024-01-15',
    type: 'string',
    format: 'date',
  })
  since: Date;

  @ApiProperty({
    description: 'Fecha hasta cuando el usuario tendrá este rol (opcional)',
    example: '2024-12-31',
    type: 'string',
    format: 'date',
    nullable: true,
  })
  until: Date;

  @ApiProperty({
    description: 'Información del usuario',
    type: 'object',
    properties: {
      id: { type: 'number', example: 1 },
      name: { type: 'string', example: 'Juan' },
      lastname: { type: 'string', example: 'Pérez' },
      username: { type: 'string', example: 'juanperez' },
      email: { type: 'string', example: 'juan.perez@email.com' },
    },
  })
  user: {
    id: number;
    name: string;
    lastname: string;
    username: string;
    email: string;
  };

  @ApiProperty({
    description: 'Información del rol asignado',
    type: 'object',
    properties: {
      id: { type: 'number', example: 1 },
      rolName: { type: 'string', example: 'Administrador' },
      rolDescription: { type: 'string', example: 'Rol con permisos completos para administrar el sistema' },
    },
  })
  rol: {
    id: number;
    rolName: string;
    rolDescription: string;
  };
}
