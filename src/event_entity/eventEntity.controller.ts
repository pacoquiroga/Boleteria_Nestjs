import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ValidationPipe,
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
  ApiQuery,
} from '@nestjs/swagger';
import { EventEntityService } from './eventEntity.service';
import { CreateEventEntityDto } from './dto/create-eventEntity.dto';
import { UpdateEventEntityDto } from './dto/update-eventEntity.dto';
import { ResponseEventEntityDto } from './dto/response-eventEntity.dto';
import { EventState } from './enums/event-state.enum';
import { EventEntity } from './entities/eventEntity.entity';
import { PaginationRequest } from 'src/utils/dto/pagination.dto';

@ApiTags('🎭 Eventos')
@Controller('event-entity')
export class EventEntityController {
  constructor(private readonly eventEntityService: EventEntityService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear nuevo evento',
    description: `
      Crea un nuevo evento en el sistema.
      
      **Funcionalidad:**
      - Permite crear eventos con información completa
      - Asigna automáticamente el estado inicial
      - Valida que la fecha sea futura
      - Establece automáticamente las fechas de creación y actualización
      
      **Validaciones:**
      - Nombre: obligatorio, entre 3 y 200 caracteres
      - Descripción: obligatoria, entre 10 y 1000 caracteres
      - Fecha: obligatoria, debe ser una fecha futura
      - Ciudad: obligatoria, entre 2 y 100 caracteres
      - Dirección: obligatoria, entre 10 y 500 caracteres
      - Capacidad: obligatoria, número entero positivo
      - ID Usuario: obligatorio, debe existir en el sistema
    `,
  })
  @ApiBody({
    type: CreateEventEntityDto,
    description: 'Datos para crear el nuevo evento',
    examples: {
      concierto: {
        summary: 'Concierto de Rock',
        description: 'Ejemplo de un evento musical',
        value: {
          name: 'Concierto de Rock 2024',
          description: 'El mejor concierto de rock del año con bandas internacionales',
          date: '2024-08-15T20:00:00.000Z',
          city: 'Madrid',
          address: 'Palacio de Deportes, Av. Felipe II, s/n',
          capacity: 10000,
          idUser: 1
        }
      },
      conferencia: {
        summary: 'Conferencia Tecnológica',
        description: 'Ejemplo de un evento corporativo',
        value: {
          name: 'TechConf 2024',
          description: 'Conferencia sobre las últimas tendencias en tecnología',
          date: '2024-09-20T09:00:00.000Z',
          city: 'Barcelona',
          address: 'Centro de Convenciones, Plaza de Europa, 1',
          capacity: 500,
          idUser: 2
        }
      }
    }
  })
  @ApiCreatedResponse({
    description: 'Evento creado exitosamente',
    type: ResponseEventEntityDto,
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
            'El nombre debe tener entre 3 y 200 caracteres',
            'La fecha debe ser una fecha futura',
            'La capacidad debe ser un número positivo'
          ]
        },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Usuario organizador no encontrado',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Usuario con ID 1 no encontrado' },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  })
  create(@Body() createEventEntityDto: CreateEventEntityDto) {
    return this.eventEntityService.create(createEventEntityDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener todos los eventos',
    description: `
      Retorna una lista de todos los eventos disponibles en el sistema.
      
      **Funcionalidad:**
      - Lista todos los eventos registrados
      - Incluye información completa de cada evento
      - Ordenados por fecha del evento (próximos primero)
      - Incluye información del usuario organizador
    `,
  })
  @ApiOkResponse({
    description: 'Lista de eventos obtenida exitosamente',
    schema: {
      type: 'array',
      items: {
        $ref: '#/components/schemas/ResponseEventEntityDto',
      },
    },
  })
  findAll() {
    return this.eventEntityService.findAll();
  }

  @Post('paginated')
  @ApiOperation({
    summary: 'Obtener eventos paginados',
    description: `
      Retorna una lista paginada de eventos con opciones de filtrado y ordenamiento.
      
      **Funcionalidad:**
      - Soporte para paginación con página y límite
      - Filtros avanzados por múltiples campos
      - Ordenamiento personalizable
      - Búsqueda de texto en nombre y descripción
      
      **Filtros disponibles:**
      - Por estado del evento
      - Por ciudad
      - Por rango de fechas
      - Por capacidad mínima/máxima
      - Por organizador
    `,
  })
  @ApiBody({
    type: PaginationRequest,
    description: 'Parámetros de paginación y filtros',
    examples: {
      basico: {
        summary: 'Paginación básica',
        description: 'Obtener la primera página con 10 eventos',
        value: {
          page: 1,
          limit: 10
        }
      },
      con_filtros: {
        summary: 'Con filtros avanzados',
        description: 'Filtrar eventos activos en Madrid',
        value: {
          page: 1,
          limit: 5,
          filters: {
            state: 'ACTIVE',
            city: 'Madrid'
          },
          orderBy: 'date',
          orderDirection: 'ASC'
        }
      }
    }
  })
  @ApiOkResponse({
    description: 'Lista paginada de eventos obtenida exitosamente',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: { $ref: '#/components/schemas/ResponseEventEntityDto' },
        },
        totalCount: { type: 'number', example: 25 },
        page: { type: 'number', example: 1 },
        limit: { type: 'number', example: 10 },
        totalPages: { type: 'number', example: 3 },
      },
    },
  })
  getPaginated(
    @Body(new ValidationPipe({ transform: true }))
    pagination: PaginationRequest<EventEntity>,
  ) {
    return this.eventEntityService.getPaginated(pagination);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener evento por ID',
    description: `
      Retorna los detalles completos de un evento específico.
      
      **Funcionalidad:**
      - Busca el evento por su ID único
      - Incluye toda la información del evento
      - Incluye información del usuario organizador
      - Incluye fechas de creación y actualización
    `,
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID único del evento',
    example: 1,
  })
  @ApiOkResponse({
    description: 'Evento encontrado exitosamente',
    type: ResponseEventEntityDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Evento no encontrado',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Evento con ID 1 no encontrado' },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  })
  findOne(@Param('id') id: string) {
    return this.eventEntityService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar evento',
    description: `
      Actualiza los datos de un evento específico.
      
      **Funcionalidad:**
      - Permite actualizar cualquier campo del evento
      - Valida que las fechas sean futuras (si se actualizan)
      - Actualiza automáticamente la fecha de modificación
      - Solo el organizador puede actualizar el evento
      
      **Campos opcionales:**
      - name: Nuevo nombre del evento
      - description: Nueva descripción
      - date: Nueva fecha y hora
      - city: Nueva ciudad
      - address: Nueva dirección
      - capacity: Nueva capacidad
      - state: Nuevo estado del evento
      
      **Nota:** Al menos uno de los campos debe ser proporcionado para realizar la actualización.
    `,
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID único del evento a actualizar',
    example: 1,
  })
  @ApiBody({
    type: UpdateEventEntityDto,
    description: 'Datos para actualizar el evento',
    examples: {
      cambiar_fecha: {
        summary: 'Cambiar fecha del evento',
        description: 'Actualiza únicamente la fecha del evento',
        value: {
          date: '2024-09-15T21:00:00.000Z'
        }
      },
      cambiar_estado: {
        summary: 'Cambiar estado del evento',
        description: 'Actualiza el estado del evento (por ejemplo, para cancelarlo)',
        value: {
          state: 'CANCELLED'
        }
      },
      actualizacion_completa: {
        summary: 'Actualización completa',
        description: 'Actualiza múltiples campos del evento',
        value: {
          name: 'Concierto de Rock 2024 - Edición Especial',
          description: 'El mejor concierto de rock del año con bandas internacionales y artistas invitados',
          date: '2024-08-20T20:30:00.000Z',
          capacity: 12000,
          state: 'ACTIVE'
        }
      }
    }
  })
  @ApiOkResponse({
    description: 'Evento actualizado exitosamente',
    type: ResponseEventEntityDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Evento no encontrado',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Evento con ID 1 no encontrado' },
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
            'La fecha debe ser una fecha futura',
            'La capacidad debe ser un número positivo',
            'Al menos un campo debe ser proporcionado para la actualización'
          ]
        },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Sin permisos para actualizar el evento',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 403 },
        message: { type: 'string', example: 'Solo el organizador puede actualizar este evento' },
        error: { type: 'string', example: 'Forbidden' },
      },
    },
  })
  update(
    @Param('id') id: string,
    @Body() updateEventEntityDto: UpdateEventEntityDto,
  ) {
    return this.eventEntityService.update(+id, updateEventEntityDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar evento',
    description: `
      Elimina un evento del sistema.
      
      **Funcionalidad:**
      - Elimina el evento específico
      - Verifica que no tenga tickets vendidos
      - Solo el organizador puede eliminar el evento
      - Operación irreversible
      
      **Nota:** Solo se pueden eliminar eventos que no tengan tickets vendidos o reservados.
    `,
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID único del evento a eliminar',
    example: 1,
  })
  @ApiOkResponse({
    description: 'Evento eliminado exitosamente',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Evento eliminado exitosamente' },
        deletedId: { type: 'number', example: 1 },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Evento no encontrado',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Evento con ID 1 no encontrado' },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Conflicto - El evento tiene tickets vendidos',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 409 },
        message: { type: 'string', example: 'No se puede eliminar el evento porque tiene tickets vendidos' },
        error: { type: 'string', example: 'Conflict' },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Sin permisos para eliminar el evento',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 403 },
        message: { type: 'string', example: 'Solo el organizador puede eliminar este evento' },
        error: { type: 'string', example: 'Forbidden' },
      },
    },
  })
  remove(@Param('id') id: string) {
    return this.eventEntityService.remove(+id);
  }

  @Get('user/:idUser')
  @ApiOperation({
    summary: 'Obtener eventos por usuario organizador',
    description: `
      Retorna todos los eventos organizados por un usuario específico.
      
      **Funcionalidad:**
      - Busca eventos por ID del usuario organizador
      - Incluye eventos en todos los estados
      - Ordenados por fecha del evento
      - Útil para dashboard del organizador
    `,
  })
  @ApiParam({
    name: 'idUser',
    type: 'number',
    description: 'ID único del usuario organizador',
    example: 1,
  })
  @ApiOkResponse({
    description: 'Lista de eventos del usuario obtenida exitosamente',
    schema: {
      type: 'array',
      items: {
        $ref: '#/components/schemas/ResponseEventEntityDto',
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Usuario no encontrado o sin eventos',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'No se encontraron eventos para el usuario con ID 1' },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  })
  findByUser(@Param('idUser') idUser: string) {
    return this.eventEntityService.findByUser(+idUser);
  }

  @Get('state/:state')
  @ApiOperation({
    summary: 'Obtener eventos por estado',
    description: `
      Retorna todos los eventos que coinciden con un estado específico.
      
      **Funcionalidad:**
      - Filtra eventos por estado
      - Útil para dashboards y reportes
      - Ordenados por fecha del evento
      
      **Estados disponibles:**
      - ACTIVE: Eventos activos y disponibles
      - INACTIVE: Eventos inactivos
      - CANCELLED: Eventos cancelados
      - COMPLETED: Eventos finalizados
    `,
  })
  @ApiParam({
    name: 'state',
    enum: EventState,
    description: 'Estado del evento',
    example: EventState.ACTIVE,
  })
  @ApiOkResponse({
    description: 'Lista de eventos por estado obtenida exitosamente',
    schema: {
      type: 'array',
      items: {
        $ref: '#/components/schemas/ResponseEventEntityDto',
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Estado inválido',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'string', example: `El estado debe ser uno de los siguientes: ${Object.values(EventState).join(', ')}` },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
  })
  findByState(@Param('state') state: EventState) {
    return this.eventEntityService.findByState(state);
  }
}
