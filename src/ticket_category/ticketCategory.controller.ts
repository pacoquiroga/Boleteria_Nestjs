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
import { TicketCategoryService } from './ticketCategory.service';
import { CreateTicketCategoryDto } from './dto/create-ticketCategory.dto';
import { UpdateTicketCategoryDto } from './dto/update-ticketCategory.dto';
import { ResponseTicketCategoryDto } from './dto/response-ticketCategory.dto';

@ApiTags('🎫 Categorías de Tickets')
@Controller('ticket-category')
export class TicketCategoryController {
  constructor(private readonly ticketCategoryService: TicketCategoryService) {}

  @Post()
  @ApiOperation({ 
    summary: 'Crear múltiples categorías de tickets',
    description: 'Crea múltiples categorías de tickets para un evento de forma simultánea'
  })
  @ApiBody({
    type: [CreateTicketCategoryDto],
    description: 'Array de categorías de tickets a crear',
    examples: {
      categorias_concierto: {
        summary: 'Categorías para concierto',
        description: 'Ejemplo de diferentes categorías para un concierto',
        value: [
          {
            name: 'General',
            price: 50.00,
            description: 'Entrada general con ubicación libre',
            availableTickets: 500,
            startDay: '2024-01-15',
            endDate: '2024-08-15',
            eventId: 1
          },
          {
            name: 'VIP',
            price: 150.00,
            description: 'Acceso VIP con asientos preferenciales y bebidas incluidas',
            availableTickets: 100,
            startDay: '2024-01-15',
            endDate: '2024-08-15',
            eventId: 1
          },
          {
            name: 'Premium',
            price: 100.00,
            description: 'Asientos preferenciales con mejor vista al escenario',
            availableTickets: 200,
            startDay: '2024-01-15',
            endDate: '2024-08-15',
            eventId: 1
          }
        ]
      }
    }
  })
  @ApiResponse({
    status: 201,
    description: 'Categorías de tickets creadas exitosamente',
    type: [ResponseTicketCategoryDto],
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos en alguna categoría',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'string', example: 'El evento especificado no existe' },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
  })
  async createMultipleTicketCategories(
    @Body() createTicketCategoriesDtos: CreateTicketCategoryDto[],
  ) {
    try {
      return await this.ticketCategoryService.createMultiple(
        createTicketCategoriesDtos,
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('event/:eventId')
  @ApiOperation({ 
    summary: 'Obtener categorías de tickets por evento',
    description: 'Retorna todas las categorías de tickets disponibles para un evento específico'
  })
  @ApiParam({
    name: 'eventId',
    type: 'number',
    description: 'ID único del evento',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Categorías de tickets obtenidas exitosamente',
    type: [ResponseTicketCategoryDto],
  })
  @ApiResponse({
    status: 404,
    description: 'Evento no encontrado',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'No se encontraron categorías para el evento especificado' },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  })
  async findAllTicketCategoriesFromEvent(@Param('eventId') eventId: string) {
    try {
      return await this.ticketCategoryService.findAllTicketCategoriesFromEvent(
        +eventId,
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Obtener categoría de ticket por ID',
    description: 'Retorna los detalles de una categoría de ticket específica'
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID único de la categoría de ticket',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Categoría de ticket encontrada exitosamente',
    type: ResponseTicketCategoryDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Categoría de ticket no encontrada',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Categoría de ticket con ID 1 no encontrada' },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  })
  async findOne(@Param('id') id: string) {
    try {
      return await this.ticketCategoryService.findOne(+id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Patch(':id')
  @ApiOperation({ 
    summary: 'Actualizar categoría de ticket',
    description: 'Actualiza los datos de una categoría de ticket existente. Todos los campos son opcionales.'
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID único de la categoría de ticket a actualizar',
    example: 1,
  })
  @ApiBody({
    type: UpdateTicketCategoryDto,
    description: 'Datos de la categoría de ticket a actualizar (todos los campos son opcionales)',
    examples: {
      actualizar_precio: {
        summary: 'Actualizar precio',
        description: 'Ejemplo de actualización del precio de una categoría',
        value: {
          price: 75.00
        }
      },
      actualizar_disponibilidad: {
        summary: 'Actualizar disponibilidad',
        description: 'Ejemplo de actualización de tickets disponibles',
        value: {
          availableTickets: 250
        }
      },
      actualizacion_completa: {
        summary: 'Actualización completa',
        description: 'Ejemplo de actualización de múltiples campos',
        value: {
          name: 'Premium Plus',
          price: 120.00,
          description: 'Acceso premium con beneficios adicionales',
          availableTickets: 150,
          endDate: '2024-09-15'
        }
      }
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Categoría de ticket actualizada exitosamente',
    type: ResponseTicketCategoryDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'string', example: 'El precio debe ser mayor a cero' },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Categoría de ticket no encontrada',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Categoría de ticket no encontrada' },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  })
  async update(
    @Param('id') id: string,
    @Body() updateTicketCategoryDto: UpdateTicketCategoryDto,
  ) {
    try {
      return await this.ticketCategoryService.update(+id, updateTicketCategoryDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  @ApiOperation({ 
    summary: 'Eliminar categoría de ticket',
    description: 'Elimina permanentemente una categoría de ticket del sistema. Esta acción no se puede deshacer.'
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID único de la categoría de ticket a eliminar',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Categoría de ticket eliminada exitosamente',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Categoría de ticket eliminada exitosamente' },
        id: { type: 'number', example: 1 },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Error al eliminar la categoría',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'string', example: 'No se puede eliminar la categoría porque tiene tickets vendidos' },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Categoría de ticket no encontrada',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Categoría de ticket no encontrada' },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  })
  async remove(@Param('id') id: string) {
    try {
      return await this.ticketCategoryService.remove(+id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
