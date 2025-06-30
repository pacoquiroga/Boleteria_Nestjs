import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { RolService } from './rol.service';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
import { ResponseRolDto } from './dto/response-rol.dto';

@ApiTags('🔐 Roles')
@Controller('rol')
export class RolController {
  constructor(private readonly rolService: RolService) {}

  @Post()
  @ApiOperation({ 
    summary: 'Crear un nuevo rol',
    description: 'Crea un nuevo rol en el sistema con los permisos especificados'
  })
  @ApiBody({
    type: CreateRolDto,
    description: 'Datos del rol a crear',
    examples: {
      rol_admin: {
        summary: 'Rol de Administrador',
        description: 'Ejemplo de rol con permisos administrativos',
        value: {
          rolName: 'Administrador',
          rolDescription: 'Rol con permisos completos para administrar el sistema'
        }
      },
      rol_usuario: {
        summary: 'Rol de Usuario',
        description: 'Ejemplo de rol básico para usuarios',
        value: {
          rolName: 'Usuario',
          rolDescription: 'Rol básico con permisos limitados para usuarios regulares'
        }
      },
      rol_organizador: {
        summary: 'Rol de Organizador',
        description: 'Ejemplo de rol para organizadores de eventos',
        value: {
          rolName: 'Organizador',
          rolDescription: 'Rol con permisos para crear y gestionar eventos'
        }
      }
    }
  })
  @ApiResponse({
    status: 201,
    description: 'Rol creado exitosamente',
    type: ResponseRolDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos o rol ya existe',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'string', example: 'El rol ya existe' },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
  })
  async create(@Body() createRolDto: CreateRolDto) {
    try {
      return await this.rolService.create(createRolDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @ApiOperation({ 
    summary: 'Obtener todos los roles',
    description: 'Retorna una lista con todos los roles disponibles en el sistema'
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de roles obtenida exitosamente',
    type: [ResponseRolDto],
  })
  @ApiResponse({
    status: 500,
    description: 'Error interno del servidor',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 500 },
        message: { type: 'string', example: 'Error al obtener los roles' },
        error: { type: 'string', example: 'Internal Server Error' },
      },
    },
  })
  async findAll() {
    try {
      return await this.rolService.findAll();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Obtener rol por ID',
    description: 'Retorna los detalles de un rol específico basado en su ID único'
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID único del rol',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Rol encontrado exitosamente',
    type: ResponseRolDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Rol no encontrado',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Rol con ID 1 no encontrado' },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  })
  async findOne(@Param('id') id: string) {
    try {
      return await this.rolService.findOne(+id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Patch(':id')
  @ApiOperation({ 
    summary: 'Actualizar rol',
    description: 'Actualiza los datos de un rol existente. Todos los campos son opcionales.'
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID único del rol a actualizar',
    example: 1,
  })
  @ApiBody({
    type: UpdateRolDto,
    description: 'Datos del rol a actualizar (todos los campos son opcionales)',
    examples: {
      actualizacion_nombre: {
        summary: 'Actualizar solo el nombre',
        description: 'Ejemplo de actualización del nombre del rol',
        value: {
          rolName: 'Super Administrador'
        }
      },
      actualizacion_completa: {
        summary: 'Actualización completa',
        description: 'Ejemplo de actualización de todos los campos',
        value: {
          rolName: 'Moderador',
          rolDescription: 'Rol con permisos de moderación de contenido y usuarios'
        }
      }
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Rol actualizado exitosamente',
    type: ResponseRolDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'string', example: 'El nombre del rol ya existe' },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Rol no encontrado',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Rol no encontrado' },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  })
  async update(@Param('id') id: string, @Body() updateRolDto: UpdateRolDto) {
    try {
      return await this.rolService.update(+id, updateRolDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  @ApiOperation({ 
    summary: 'Eliminar rol',
    description: 'Elimina permanentemente un rol del sistema. Esta acción no se puede deshacer.'
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID único del rol a eliminar',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Rol eliminado exitosamente',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Rol eliminado exitosamente' },
        id: { type: 'number', example: 1 },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Error al eliminar el rol',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'string', example: 'No se puede eliminar el rol porque tiene usuarios asociados' },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Rol no encontrado',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Rol no encontrado' },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  })
  async remove(@Param('id') id: string) {
    try {
      return await this.rolService.remove(+id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
