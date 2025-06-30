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
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { ResponseTicketDto } from './dto/response-ticket.dto';

@ApiTags('🎟️ Tickets')
@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post()
  @ApiOperation({ 
    summary: 'Crear un nuevo ticket',
    description: 'Crea un nuevo ticket asociado a una categoría y transacción específica'
  })
  @ApiBody({
    type: CreateTicketDto,
    description: 'Datos del ticket a crear',
    examples: {
      ticket_vip: {
        summary: 'Ticket VIP',
        description: 'Ejemplo de creación de ticket VIP',
        value: {
          qrCode: 'QR_VIP_12345',
          state: 'ACTIVE',
          ticketCategoryId: 1,
          transactionId: 1
        }
      },
      ticket_general: {
        summary: 'Ticket General',
        description: 'Ejemplo de creación de ticket general',
        value: {
          qrCode: 'QR_GEN_67890',
          state: 'PENDING',
          ticketCategoryId: 2,
          transactionId: 2
        }
      }
    }
  })
  @ApiResponse({
    status: 201,
    description: 'Ticket creado exitosamente',
    type: ResponseTicketDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos o categoría/transacción no existe',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'string', example: 'La categoría de ticket especificada no existe' },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
  })
  async create(@Body() createTicketDto: CreateTicketDto) {
    try {
      return await this.ticketService.create(createTicketDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @ApiOperation({ 
    summary: 'Obtener todos los tickets',
    description: 'Retorna una lista con todos los tickets registrados en el sistema'
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de tickets obtenida exitosamente',
    type: [ResponseTicketDto],
  })
  @ApiResponse({
    status: 500,
    description: 'Error interno del servidor',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 500 },
        message: { type: 'string', example: 'Error al obtener los tickets' },
        error: { type: 'string', example: 'Internal Server Error' },
      },
    },
  })
  async findAll() {
    try {
      return await this.ticketService.findAll();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Obtener ticket por ID',
    description: 'Retorna los detalles de un ticket específico'
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID único del ticket',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Ticket encontrado exitosamente',
    type: ResponseTicketDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Ticket no encontrado',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Ticket con ID 1 no encontrado' },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  })
  async findOne(@Param('id') id: string) {
    try {
      return await this.ticketService.findOne(+id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Patch(':id')
  @ApiOperation({ 
    summary: 'Actualizar ticket',
    description: 'Actualiza el estado u otros datos de un ticket existente'
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID único del ticket a actualizar',
    example: 1,
  })
  @ApiBody({
    type: UpdateTicketDto,
    description: 'Datos del ticket a actualizar (todos los campos son opcionales)',
    examples: {
      marcar_usado: {
        summary: 'Marcar como usado',
        description: 'Ejemplo de actualización para marcar ticket como usado',
        value: {
          state: 'USED',
          useDate: '2024-08-15T20:30:00.000Z'
        }
      },
      actualizar_qr: {
        summary: 'Actualizar código QR',
        description: 'Ejemplo de actualización del código QR',
        value: {
          qrCode: 'QR_NEW_CODE_12345'
        }
      },
      cancelar_ticket: {
        summary: 'Cancelar ticket',
        description: 'Ejemplo de cancelación de ticket',
        value: {
          state: 'CANCELLED'
        }
      }
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Ticket actualizado exitosamente',
    type: ResponseTicketDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'string', example: 'No se puede modificar un ticket ya usado' },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Ticket no encontrado',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Ticket no encontrado' },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  })
  async update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
    try {
      return await this.ticketService.update(+id, updateTicketDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  @ApiOperation({ 
    summary: 'Eliminar ticket',
    description: 'Elimina permanentemente un ticket del sistema. Esta acción no se puede deshacer.'
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID único del ticket a eliminar',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Ticket eliminado exitosamente',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Ticket eliminado exitosamente' },
        id: { type: 'number', example: 1 },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Error al eliminar el ticket',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'string', example: 'No se puede eliminar un ticket activo' },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Ticket no encontrado',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Ticket no encontrado' },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  })
  async remove(@Param('id') id: string) {
    try {
      return await this.ticketService.remove(+id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
