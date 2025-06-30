/**
 * TEMPLATE DE CONTROLADOR CON SWAGGER
 * 
 * Este archivo es un template que puedes usar como base para todos tus controladores.
 * Copia y adapta este código para mantener consistencia en la documentación.
 */

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
  ApiBearerAuth,
  ApiConsumes,
  ApiProduces,
} from '@nestjs/swagger';

// IMPORTANTE: Reemplaza estos imports con los reales de tu módulo
// import { YourService } from './your.service';
// import { CreateYourDto } from './dto/create-your.dto';
// import { UpdateYourDto } from './dto/update-your.dto';
// import { YourResponseDto } from './dto/response-your.dto';

@ApiTags('tu-modulo') // 🏷️ Nombre del grupo en Swagger
@ApiBearerAuth('JWT-auth') // 🔐 Requiere autenticación JWT
@Controller('tu-endpoint') // 🛣️ Ruta base del controlador
export class YourControllerTemplate {
  // constructor(private readonly yourService: YourService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear nuevo recurso', // 📝 Descripción corta
    description: 'Descripción detallada de lo que hace este endpoint. Puede incluir markdown.', // 📖 Descripción larga
  })
  @ApiConsumes('application/json') // 📥 Tipo de contenido que acepta
  @ApiProduces('application/json') // 📤 Tipo de contenido que retorna
  @ApiBody({
    // type: CreateYourDto, // 📋 DTO de entrada
    description: 'Datos necesarios para crear el recurso',
    examples: {
      ejemplo1: {
        summary: 'Ejemplo básico',
        description: 'Un ejemplo simple del payload',
        value: {
          name: 'Ejemplo',
          description: 'Descripción del recurso',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Recurso creado exitosamente',
    // type: YourResponseDto, // 📋 DTO de respuesta
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number', example: 1 },
        name: { type: 'string', example: 'Nombre del recurso' },
        createdAt: { type: 'string', format: 'date-time' },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Datos de entrada inválidos',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { 
          type: 'array', 
          items: { type: 'string' },
          example: ['name should not be empty', 'description must be a string'],
        },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Token de autenticación inválido o ausente',
  })
  // create(@Body() createDto: CreateYourDto) {
  //   return this.yourService.create(createDto);
  // }
  create(@Body() createDto: any) {
    // Implementación del método
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener lista de recursos',
    description: 'Retorna una lista paginada de todos los recursos disponibles',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Número de página (por defecto: 1)',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Cantidad de elementos por página (por defecto: 10)',
    example: 10,
  })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Término de búsqueda para filtrar resultados',
    example: 'concierto',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de recursos obtenida exitosamente',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number', example: 1 },
              name: { type: 'string', example: 'Recurso 1' },
            },
          },
        },
        meta: {
          type: 'object',
          properties: {
            total: { type: 'number', example: 100 },
            page: { type: 'number', example: 1 },
            limit: { type: 'number', example: 10 },
            totalPages: { type: 'number', example: 10 },
          },
        },
      },
    },
  })
  findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
  ) {
    // return this.yourService.findAll({ page, limit, search });
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener recurso por ID',
    description: 'Retorna un recurso específico basado en su identificador único',
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'Identificador único del recurso',
    example: 1,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Recurso encontrado exitosamente',
    // type: YourResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Recurso no encontrado',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Recurso con ID 1 no encontrado' },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  })
  findOne(@Param('id') id: string) {
    // return this.yourService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar recurso parcialmente',
    description: 'Actualiza campos específicos de un recurso existente',
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'Identificador único del recurso a actualizar',
    example: 1,
  })
  @ApiBody({
    // type: UpdateYourDto,
    description: 'Campos a actualizar del recurso',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Recurso actualizado exitosamente',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Recurso no encontrado',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Datos de actualización inválidos',
  })
  update(@Param('id') id: string, @Body() updateDto: any) {
    // return this.yourService.update(+id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar recurso',
    description: 'Elimina permanentemente un recurso del sistema',
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'Identificador único del recurso a eliminar',
    example: 1,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Recurso eliminado exitosamente',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Recurso eliminado exitosamente' },
        deletedId: { type: 'number', example: 1 },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Recurso no encontrado',
  })
  remove(@Param('id') id: string) {
    // return this.yourService.remove(+id);
  }
}

/**
 * 🚀 DECORADORES SWAGGER MÁS UTILIZADOS:
 * 
 * @ApiTags() - Agrupa endpoints en la documentación
 * @ApiOperation() - Describe la operación del endpoint
 * @ApiParam() - Documenta parámetros de ruta
 * @ApiQuery() - Documenta parámetros de query string
 * @ApiBody() - Documenta el cuerpo de la petición
 * @ApiResponse() - Documenta posibles respuestas
 * @ApiBearerAuth() - Indica que requiere autenticación JWT
 * @ApiConsumes() - Especifica tipo de contenido que acepta
 * @ApiProduces() - Especifica tipo de contenido que retorna
 * @ApiHeader() - Documenta headers requeridos
 * @ApiCookieAuth() - Para autenticación por cookies
 * @ApiBasicAuth() - Para autenticación básica
 * @ApiSecurity() - Para esquemas de seguridad personalizados
 */
