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
import { UserRolService } from './user_rol.service';
import { CreateUserRolDto } from './dto/create-user_rol.dto';
import { UpdateUserRolDto } from './dto/update-user_rol.dto';
import { ResponseUserRolDto } from './dto/response-user_rol.dto';

@ApiTags('👥 Asignación de Roles')
@Controller('user-rol')
export class UserRolController {
  constructor(private readonly userRolService: UserRolService) {}

  @Post()
  @ApiOperation({ 
    summary: 'Asignar rol a usuario',
    description: 'Asigna un rol específico a un usuario con fechas de vigencia'
  })
  @ApiBody({
    type: CreateUserRolDto,
    description: 'Datos de la asignación de rol',
    examples: {
      asignacion_permanente: {
        summary: 'Asignación permanente',
        description: 'Ejemplo de asignación de rol sin fecha de vencimiento',
        value: {
          userId: 1,
          rolId: 2,
          since: '2024-01-15'
        }
      },
      asignacion_temporal: {
        summary: 'Asignación temporal',
        description: 'Ejemplo de asignación de rol con fecha de vencimiento',
        value: {
          userId: 2,
          rolId: 3,
          since: '2024-01-15',
          until: '2024-12-31'
        }
      }
    }
  })
  @ApiResponse({
    status: 201,
    description: 'Rol asignado exitosamente',
    type: ResponseUserRolDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos o usuario/rol no existe',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'string', example: 'El usuario ya tiene este rol asignado' },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
  })
  async create(@Body() createUserRolDto: CreateUserRolDto) {
    try {
      return await this.userRolService.create(createUserRolDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @ApiOperation({ 
    summary: 'Obtener todas las asignaciones de roles',
    description: 'Retorna una lista con todas las asignaciones de roles en el sistema'
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de asignaciones obtenida exitosamente',
    type: [ResponseUserRolDto],
  })
  @ApiResponse({
    status: 500,
    description: 'Error interno del servidor',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 500 },
        message: { type: 'string', example: 'Error al obtener las asignaciones' },
        error: { type: 'string', example: 'Internal Server Error' },
      },
    },
  })
  async findAll() {
    try {
      return await this.userRolService.findAll();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Obtener asignación de rol por ID',
    description: 'Retorna los detalles de una asignación de rol específica'
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID único de la asignación de rol',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Asignación encontrada exitosamente',
    type: ResponseUserRolDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Asignación no encontrada',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Asignación con ID 1 no encontrada' },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  })
  async findOne(@Param('id') id: string) {
    try {
      return await this.userRolService.findOne(+id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Patch(':id')
  @ApiOperation({ 
    summary: 'Actualizar asignación de rol',
    description: 'Actualiza las fechas de vigencia de una asignación de rol existente'
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID único de la asignación a actualizar',
    example: 1,
  })
  @ApiBody({
    type: UpdateUserRolDto,
    description: 'Datos de la asignación a actualizar (todos los campos son opcionales)',
    examples: {
      extender_vigencia: {
        summary: 'Extender vigencia',
        description: 'Ejemplo de extensión de fecha de vencimiento',
        value: {
          until: '2025-12-31'
        }
      },
      cambiar_fecha_inicio: {
        summary: 'Cambiar fecha de inicio',
        description: 'Ejemplo de cambio de fecha de inicio',
        value: {
          since: '2024-02-01'
        }
      },
      actualizacion_completa: {
        summary: 'Actualización completa',
        description: 'Ejemplo de actualización de todas las fechas',
        value: {
          since: '2024-01-01',
          until: '2024-06-30'
        }
      }
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Asignación actualizada exitosamente',
    type: ResponseUserRolDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'string', example: 'La fecha de fin debe ser posterior a la fecha de inicio' },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Asignación no encontrada',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Asignación no encontrada' },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  })
  async update(@Param('id') id: string, @Body() updateUserRolDto: UpdateUserRolDto) {
    try {
      return await this.userRolService.update(+id, updateUserRolDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  @ApiOperation({ 
    summary: 'Eliminar asignación de rol',
    description: 'Elimina permanentemente una asignación de rol. Esta acción no se puede deshacer.'
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID único de la asignación a eliminar',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Asignación eliminada exitosamente',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Asignación de rol eliminada exitosamente' },
        id: { type: 'number', example: 1 },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Error al eliminar la asignación',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'string', example: 'No se puede eliminar una asignación activa' },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Asignación no encontrada',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Asignación no encontrada' },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  })
  async remove(@Param('id') id: string) {
    try {
      return await this.userRolService.remove(+id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
