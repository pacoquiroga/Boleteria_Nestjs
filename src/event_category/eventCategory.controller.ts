import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiResponse,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { EventCategoryService } from './eventCategory.service';
import { CreateEventCategoryDto } from './dto/create-eventCategory.dto';
import { UpdateEventCategoryDto } from './dto/update-eventCategory.dto';
import { ResponseEventCategoryDto } from './dto/response-eventCategory.dto';

@ApiTags('📂 Categorías de Eventos')
@Controller('event-category')
export class EventCategoryController {
  constructor(private readonly eventCategoryService: EventCategoryService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear nueva categoría de evento',
    description: `
      Crea una nueva categoría de evento en el sistema.
      
      **Funcionalidad:**
      - Permite crear categorías para clasificar eventos
      - Valida que el nombre sea único
      - Establece automáticamente las fechas de creación y actualización
      
      **Validaciones:**
      - Nombre: obligatorio, entre 2 y 100 caracteres
      - Descripción: obligatoria, entre 10 y 500 caracteres
    `,
  })
  @ApiBody({
    type: CreateEventCategoryDto,
    description: 'Datos para crear la nueva categoría de evento',
    examples: {
      ejemplo_completo: {
        summary: 'Categoría de Conciertos',
        description: 'Ejemplo de una categoría para eventos musicales',
        value: {
          name: 'Conciertos',
          description: 'Eventos musicales y espectáculos en vivo'
        }
      },
      ejemplo_deportes: {
        summary: 'Categoría de Deportes',
        description: 'Ejemplo de una categoría para eventos deportivos',
        value: {
          name: 'Deportes',
          description: 'Competencias deportivas, torneos y eventos atléticos'
        }
      }
    }
  })
  @ApiCreatedResponse({
    description: 'Categoría de evento creada exitosamente',
    type: ResponseEventCategoryDto,
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
          example: [
            'El nombre debe ser una cadena de texto',
            'El nombre debe tener entre 2 y 100 caracteres',
            'La descripción debe ser una cadena de texto',
            'La descripción debe tener entre 10 y 500 caracteres'
          ]
        },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Conflicto - La categoría ya existe',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 409 },
        message: { type: 'string', example: 'Ya existe una categoría con ese nombre' },
        error: { type: 'string', example: 'Conflict' },
      },
    },
  })
  create(@Body() createEventCategoryDto: CreateEventCategoryDto) {
    return this.eventCategoryService.create(createEventCategoryDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener todas las categorías de eventos',
    description: `
      Retorna una lista de todas las categorías de eventos disponibles en el sistema.
      
      **Funcionalidad:**
      - Lista todas las categorías activas
      - Incluye información completa de cada categoría
      - Ordenadas por fecha de creación (más recientes primero)
    `,
  })
  @ApiOkResponse({
    description: 'Lista de categorías de eventos obtenida exitosamente',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          name: { type: 'string', example: 'Conciertos' },
          description: { type: 'string', example: 'Eventos musicales y espectáculos en vivo' },
          createdAt: { type: 'string', format: 'date-time', example: '2024-01-15T10:30:00.000Z' },
          updatedAt: { type: 'string', format: 'date-time', example: '2024-01-20T14:45:00.000Z' },
        },
      },
    },
  })
  findAll() {
    return this.eventCategoryService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener categoría de evento por ID',
    description: `
      Retorna los detalles de una categoría de evento específica.
      
      **Funcionalidad:**
      - Busca la categoría por su ID único
      - Retorna toda la información de la categoría
      - Incluye fechas de creación y actualización
    `,
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID único de la categoría de evento',
    example: 1,
  })
  @ApiOkResponse({
    description: 'Categoría de evento encontrada exitosamente',
    type: ResponseEventCategoryDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Categoría de evento no encontrada',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Categoría con ID 1 no encontrada' },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  })
  findOne(@Param('id') id: string) {
    return this.eventCategoryService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar categoría de evento',
    description: `
      Actualiza los datos de una categoría de evento específica.
      
      **Funcionalidad:**
      - Permite actualizar nombre y/o descripción
      - Valida que el nuevo nombre sea único (si se proporciona)
      - Actualiza automáticamente la fecha de modificación
      
      **Campos opcionales:**
      - name: Nuevo nombre de la categoría
      - description: Nueva descripción de la categoría
      
      **Nota:** Al menos uno de los campos debe ser proporcionado para realizar la actualización.
    `,
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID único de la categoría de evento a actualizar',
    example: 1,
  })
  @ApiBody({
    type: UpdateEventCategoryDto,
    description: 'Datos para actualizar la categoría de evento',
    examples: {
      actualizar_nombre: {
        summary: 'Actualizar solo el nombre',
        description: 'Actualiza únicamente el nombre de la categoría',
        value: {
          name: 'Conciertos de Rock'
        }
      },
      actualizar_descripcion: {
        summary: 'Actualizar solo la descripción',
        description: 'Actualiza únicamente la descripción de la categoría',
        value: {
          description: 'Eventos musicales de rock, metal y géneros relacionados'
        }
      },
      actualizar_completo: {
        summary: 'Actualizar nombre y descripción',
        description: 'Actualiza tanto el nombre como la descripción',
        value: {
          name: 'Eventos Musicales',
          description: 'Todo tipo de eventos musicales: conciertos, festivales, recitales y espectáculos en vivo'
        }
      }
    }
  })
  @ApiOkResponse({
    description: 'Categoría de evento actualizada exitosamente',
    type: ResponseEventCategoryDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Categoría de evento no encontrada',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Categoría con ID 1 no encontrada' },
        error: { type: 'string', example: 'Not Found' },
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
          example: [
            'El nombre debe ser una cadena de texto',
            'El nombre debe tener entre 2 y 100 caracteres',
            'Al menos un campo debe ser proporcionado para la actualización'
          ]
        },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Conflicto - El nombre ya existe',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 409 },
        message: { type: 'string', example: 'Ya existe una categoría con ese nombre' },
        error: { type: 'string', example: 'Conflict' },
      },
    },
  })
  update(
    @Param('id') id: string,
    @Body() updateEventCategoryDto: UpdateEventCategoryDto,
  ) {
    return this.eventCategoryService.update(+id, updateEventCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar categoría de evento',
    description: `
      Elimina una categoría de evento del sistema.
      
      **Funcionalidad:**
      - Elimina la categoría específica
      - Verifica que no esté siendo utilizada por eventos
      - Operación irreversible
      
      **Nota:** Solo se pueden eliminar categorías que no estén asociadas a eventos existentes.
    `,
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID único de la categoría de evento a eliminar',
    example: 1,
  })
  @ApiOkResponse({
    description: 'Categoría de evento eliminada exitosamente',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Categoría eliminada exitosamente' },
        deletedId: { type: 'number', example: 1 },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Categoría de evento no encontrada',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Categoría con ID 1 no encontrada' },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Conflicto - La categoría está siendo utilizada',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 409 },
        message: { type: 'string', example: 'No se puede eliminar la categoría porque está siendo utilizada por eventos' },
        error: { type: 'string', example: 'Conflict' },
      },
    },
  })
  remove(@Param('id') id: string) {
    return this.eventCategoryService.remove(+id);
  }
}
