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
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CategoryManageService } from './categoryManage.service';
import { CreateCategoryManageDto } from './dto/create-categoryManage.dto';
import { UpdateCategoryManageDto } from './dto/update-categoryManage.dto';

@ApiTags('🏷️ Gestión de Categorías')
@ApiBearerAuth('JWT-auth')
@Controller('category-manage')
export class CategoryManageController {
  constructor(private readonly categoryManageService: CategoryManageService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear nueva relación categoría-evento',
    description: 'Crea una nueva relación entre una categoría de evento y una entidad de evento',
  })
  @ApiBody({
    type: CreateCategoryManageDto,
    description: 'Datos para crear la relación categoría-evento',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Relación categoría-evento creada exitosamente',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number', example: 1 },
        eventCategory: {
          type: 'object',
          properties: {
            id: { type: 'number', example: 1 },
            name: { type: 'string', example: 'Conciertos' },
          },
        },
        eventEntity: {
          type: 'object',
          properties: {
            id: { type: 'number', example: 1 },
            name: { type: 'string', example: 'Concierto Rock 2024' },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Datos de entrada inválidos',
  })
  create(@Body() createCategoryManageDto: CreateCategoryManageDto) {
    return this.categoryManageService.create(createCategoryManageDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener todas las relaciones categoría-evento',
    description: 'Retorna una lista de todas las relaciones entre categorías y eventos',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de relaciones categoría-evento obtenida exitosamente',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          eventCategory: {
            type: 'object',
            properties: {
              id: { type: 'number', example: 1 },
              name: { type: 'string', example: 'Conciertos' },
            },
          },
          eventEntity: {
            type: 'object',
            properties: {
              id: { type: 'number', example: 1 },
              name: { type: 'string', example: 'Concierto Rock 2024' },
            },
          },
        },
      },
    },
  })
  findAll() {
    return this.categoryManageService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener relación categoría-evento por ID',
    description: 'Retorna una relación específica categoría-evento basada en su ID',
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID único de la relación categoría-evento',
    example: 1,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Relación categoría-evento encontrada',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number', example: 1 },
        eventCategory: {
          type: 'object',
          properties: {
            id: { type: 'number', example: 1 },
            name: { type: 'string', example: 'Conciertos' },
          },
        },
        eventEntity: {
          type: 'object',
          properties: {
            id: { type: 'number', example: 1 },
            name: { type: 'string', example: 'Concierto Rock 2024' },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Relación categoría-evento no encontrada',
  })
  findOne(@Param('id') id: string) {
    return this.categoryManageService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar relación categoría-evento',
    description: `
      Actualiza una relación específica categoría-evento. Permite cambiar la categoría 
      o el evento asociado en la relación.
      
      **Campos opcionales:**
      - idEventCategory: Cambiar a una nueva categoría de evento
      - idEventEntity: Cambiar a un nuevo evento
      
      **Nota:** Al menos uno de los campos debe ser proporcionado para realizar la actualización.
    `,
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID único de la relación categoría-evento a actualizar',
    example: 1,
  })
  @ApiBody({
    type: UpdateCategoryManageDto,
    description: 'Datos para actualizar la relación categoría-evento',
    examples: {
      cambiar_categoria: {
        summary: 'Cambiar solo la categoría',
        description: 'Actualiza únicamente la categoría de evento manteniendo el mismo evento',
        value: {
          idEventCategory: 2
        }
      },
      cambiar_evento: {
        summary: 'Cambiar solo el evento',
        description: 'Actualiza únicamente el evento manteniendo la misma categoría',
        value: {
          idEventEntity: 3
        }
      },
      cambiar_ambos: {
        summary: 'Cambiar categoría y evento',
        description: 'Actualiza tanto la categoría como el evento de la relación',
        value: {
          idEventCategory: 2,
          idEventEntity: 3
        }
      }
    }
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Relación categoría-evento actualizada exitosamente',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number', example: 1 },
        eventCategory: {
          type: 'object',
          properties: {
            id: { type: 'number', example: 2 },
            name: { type: 'string', example: 'Deportes' },
            description: { type: 'string', example: 'Eventos deportivos y competencias' },
          },
        },
        eventEntity: {
          type: 'object',
          properties: {
            id: { type: 'number', example: 3 },
            name: { type: 'string', example: 'Torneo de Fútbol 2024' },
            description: { type: 'string', example: 'Campeonato nacional de fútbol' },
            date: { type: 'string', format: 'date', example: '2024-08-15' },
            city: { type: 'string', example: 'Madrid' },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Relación categoría-evento no encontrada',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Relación con ID 1 no encontrada' },
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
            'El id del evento debe ser un número entero',
            'Al menos un campo debe ser proporcionado para la actualización'
          ]
        },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Conflicto - La relación ya existe',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 409 },
        message: { type: 'string', example: 'Ya existe una relación entre esta categoría y evento' },
        error: { type: 'string', example: 'Conflict' },
      },
    },
  })
  update(
    @Param('id') id: string,
    @Body() updateCategoryManageDto: UpdateCategoryManageDto,
  ) {
    return this.categoryManageService.update(+id, updateCategoryManageDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar relación categoría-evento',
    description: 'Elimina una relación específica categoría-evento',
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID único de la relación categoría-evento a eliminar',
    example: 1,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Relación categoría-evento eliminada exitosamente',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Relación categoría-evento no encontrada',
  })
  remove(@Param('id') id: string) {
    return this.categoryManageService.remove(+id);
  }

  @Get('category/:idCategory')
  @ApiOperation({
    summary: 'Obtener relaciones por categoría de evento',
    description: 'Retorna todas las relaciones asociadas a una categoría de evento específica',
  })
  @ApiParam({
    name: 'idCategory',
    type: 'number',
    description: 'ID único de la categoría de evento',
    example: 1,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de relaciones por categoría obtenida exitosamente',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          eventCategory: {
            type: 'object',
            properties: {
              id: { type: 'number', example: 1 },
              name: { type: 'string', example: 'Conciertos' },
            },
          },
          eventEntity: {
            type: 'object',
            properties: {
              id: { type: 'number', example: 1 },
              name: { type: 'string', example: 'Concierto Rock 2024' },
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No se encontraron relaciones para la categoría especificada',
  })
  findByEventCategory(@Param('idCategory') idCategory: string) {
    return this.categoryManageService.findByEventCategory(+idCategory);
  }


  @Get('event/:idEvent')
  @ApiOperation({
    summary: 'Obtener relaciones por evento',
    description: 'Retorna todas las relaciones asociadas a un evento específico',
  })
  @ApiParam({
    name: 'idEvent',
    type: 'number',
    description: 'ID único del evento',
    example: 1,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de relaciones por evento obtenida exitosamente',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          eventCategory: {
            type: 'object',
            properties: {
              id: { type: 'number', example: 1 },
              name: { type: 'string', example: 'Conciertos' },
            },
          },
          eventEntity: {
            type: 'object',
            properties: {
              id: { type: 'number', example: 1 },
              name: { type: 'string', example: 'Concierto Rock 2024' },
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No se encontraron relaciones para el evento especificado',
  })
  findByEventEntity(@Param('idEvent') idEvent: string) {
    return this.categoryManageService.findByEventEntity(+idEvent);
  }
}
