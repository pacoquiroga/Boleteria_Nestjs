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
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';

@ApiTags('👤 Usuarios')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ 
    summary: 'Crear un nuevo usuario',
    description: 'Crea un nuevo usuario en el sistema con los datos proporcionados. El rol determina los permisos del usuario.'
  })
  @ApiBody({
    type: CreateUserDto,
    description: 'Datos del usuario a crear',
    examples: {
      usuario_basico: {
        summary: 'Usuario básico',
        description: 'Ejemplo de un usuario con rol básico',
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
      usuario_admin: {
        summary: 'Usuario administrador',
        description: 'Ejemplo de un usuario con rol de administrador',
        value: {
          name: 'María',
          lastname: 'González',
          username: 'mariagonzalez',
          email: 'maria.gonzalez@admin.com',
          password: 'adminPass456',
          phone: '0987654321',
          rol: 'admin'
        }
      }
    }
  })
  @ApiResponse({
    status: 201,
    description: 'Usuario creado exitosamente',
    type: ResponseUserDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos o usuario ya existe',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'string', example: 'El email ya está registrado' },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
  })
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.userService.create(createUserDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @ApiOperation({ 
    summary: 'Obtener todos los usuarios',
    description: 'Retorna una lista con todos los usuarios registrados en el sistema'
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuarios obtenida exitosamente',
    type: [ResponseUserDto],
  })
  @ApiResponse({
    status: 500,
    description: 'Error interno del servidor',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 500 },
        message: { type: 'string', example: 'Error al obtener los usuarios' },
        error: { type: 'string', example: 'Internal Server Error' },
      },
    },
  })
  async findAll() {
    try {
      return await this.userService.findAll();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Obtener usuario por ID',
    description: 'Retorna los detalles de un usuario específico basado en su ID único'
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID único del usuario',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Usuario encontrado exitosamente',
    type: ResponseUserDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario no encontrado',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Usuario con ID 1 no encontrado' },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  })
  async findOne(@Param('id') id: string) {
    try {
      return await this.userService.findOne(+id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get('username/:username')
  @ApiOperation({ 
    summary: 'Obtener usuario por nombre de usuario',
    description: 'Retorna los detalles de un usuario específico basado en su nombre de usuario único'
  })
  @ApiParam({
    name: 'username',
    type: 'string',
    description: 'Nombre de usuario único',
    example: 'juanperez',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuario encontrado exitosamente',
    type: ResponseUserDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario no encontrado',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Usuario con username juanperez no encontrado' },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  })
  async findByUsername(@Param('username') username: string) {
    try {
      return await this.userService.findByUsername(username);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Patch(':id')
  @ApiOperation({ 
    summary: 'Actualizar usuario',
    description: 'Actualiza los datos de un usuario existente. Todos los campos son opcionales y solo se actualizarán los campos proporcionados.'
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID único del usuario a actualizar',
    example: 1,
  })
  @ApiBody({
    type: UpdateUserDto,
    description: 'Datos del usuario a actualizar (todos los campos son opcionales)',
    examples: {
      actualizacion_parcial: {
        summary: 'Actualización parcial',
        description: 'Ejemplo de actualización solo del email y teléfono',
        value: {
          email: 'nuevo.email@ejemplo.com',
          phone: '5555555555'
        }
      },
      actualizacion_completa: {
        summary: 'Actualización completa',
        description: 'Ejemplo de actualización de todos los campos',
        value: {
          name: 'Juan Carlos',
          lastname: 'Pérez López',
          username: 'juancarlos',
          email: 'juancarlos.perez@ejemplo.com',
          password: 'nuevaPassword789',
          phone: '9876543210',
          rol: 'admin',
          lastLogin: '2024-01-20T15:30:00.000Z'
        }
      }
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Usuario actualizado exitosamente',
    type: ResponseUserDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'string', example: 'El email ya está en uso por otro usuario' },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario no encontrado',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Usuario no encontrado' },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      return await this.userService.update(+id, updateUserDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  @ApiOperation({ 
    summary: 'Eliminar usuario',
    description: 'Elimina permanentemente un usuario del sistema. Esta acción no se puede deshacer.'
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID único del usuario a eliminar',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Usuario eliminado exitosamente',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Usuario eliminado exitosamente' },
        id: { type: 'number', example: 1 },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Error al eliminar el usuario',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'string', example: 'No se puede eliminar el usuario porque tiene transacciones asociadas' },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario no encontrado',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Usuario no encontrado' },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  })
  async remove(@Param('id') id: string) {
    try {
      return await this.userService.remove(+id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
