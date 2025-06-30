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
import { TransactionTicketRequestService } from './transaction_ticket_request.service';
import { CreateTransactionTicketRequestDto } from './dto/create-transaction_ticket_request.dto';
import { UpdateTransactionTicketRequestDto } from './dto/update-transaction_ticket_request.dto';
import { ResponseTransactionTicketRequestDto } from './dto/response-transaction_ticket_request.dto';

@ApiTags('🎫💳 Solicitudes de Tickets en Transacciones')
@Controller('transaction-ticket-request')
export class TransactionTicketRequestController {
  constructor(
    private readonly transactionTicketRequestService: TransactionTicketRequestService,
  ) {}

  @Post()
  @ApiOperation({ 
    summary: 'Crear solicitud de tickets',
    description: 'Crea una nueva solicitud de tickets dentro de una transacción, especificando la cantidad y categoría'
  })
  @ApiBody({
    type: CreateTransactionTicketRequestDto,
    description: 'Datos de la solicitud de tickets',
    examples: {
      solicitud_vip: {
        summary: 'Solicitud de tickets VIP',
        description: 'Ejemplo de solicitud de 2 tickets VIP',
        value: {
          quantity: 2,
          transactionId: 1,
          ticketCategoryId: 1
        }
      },
      solicitud_general: {
        summary: 'Solicitud de tickets generales',
        description: 'Ejemplo de solicitud de 5 tickets generales',
        value: {
          quantity: 5,
          transactionId: 2,
          ticketCategoryId: 2
        }
      },
      solicitud_mixta: {
        summary: 'Solicitud para transacción mixta',
        description: 'Ejemplo para una transacción con múltiples categorías',
        value: {
          quantity: 3,
          transactionId: 3,
          ticketCategoryId: 3
        }
      }
    }
  })
  @ApiResponse({
    status: 201,
    description: 'Solicitud de tickets creada exitosamente',
    type: ResponseTransactionTicketRequestDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos o no hay suficientes tickets disponibles',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'string', example: 'No hay suficientes tickets disponibles. Disponibles: 2, Solicitados: 5' },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
  })
  async create(
    @Body()
    createTransactionTicketRequestDto: CreateTransactionTicketRequestDto,
  ) {
    try {
      return await this.transactionTicketRequestService.create(
        createTransactionTicketRequestDto,
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @ApiOperation({ 
    summary: 'Obtener todas las solicitudes de tickets',
    description: 'Retorna una lista con todas las solicitudes de tickets en transacciones'
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de solicitudes obtenida exitosamente',
    type: [ResponseTransactionTicketRequestDto],
  })
  @ApiResponse({
    status: 500,
    description: 'Error interno del servidor',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 500 },
        message: { type: 'string', example: 'Error al obtener las solicitudes' },
        error: { type: 'string', example: 'Internal Server Error' },
      },
    },
  })
  async findAll() {
    try {
      return await this.transactionTicketRequestService.findAll();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Obtener solicitud por ID',
    description: 'Retorna los detalles de una solicitud de tickets específica'
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID único de la solicitud de tickets',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Solicitud encontrada exitosamente',
    type: ResponseTransactionTicketRequestDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Solicitud no encontrada',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Solicitud con ID 1 no encontrada' },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  })
  async findOne(@Param('id') id: string) {
    try {
      return await this.transactionTicketRequestService.findOne(+id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Patch(':id')
  @ApiOperation({ 
    summary: 'Actualizar solicitud de tickets',
    description: 'Actualiza la cantidad de tickets solicitados en una solicitud existente'
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID único de la solicitud a actualizar',
    example: 1,
  })
  @ApiBody({
    type: UpdateTransactionTicketRequestDto,
    description: 'Datos de la solicitud a actualizar (todos los campos son opcionales)',
    examples: {
      aumentar_cantidad: {
        summary: 'Aumentar cantidad',
        description: 'Ejemplo de aumento en la cantidad de tickets',
        value: {
          quantity: 4
        }
      },
      reducir_cantidad: {
        summary: 'Reducir cantidad',
        description: 'Ejemplo de reducción en la cantidad de tickets',
        value: {
          quantity: 1
        }
      }
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Solicitud actualizada exitosamente',
    type: ResponseTransactionTicketRequestDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos o no hay suficientes tickets disponibles',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'string', example: 'No se puede aumentar la cantidad, tickets insuficientes' },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Solicitud no encontrada',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Solicitud no encontrada' },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  })
  async update(
    @Param('id') id: string,
    @Body()
    updateTransactionTicketRequestDto: UpdateTransactionTicketRequestDto,
  ) {
    try {
      return await this.transactionTicketRequestService.update(
        +id,
        updateTransactionTicketRequestDto,
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  @ApiOperation({ 
    summary: 'Eliminar solicitud de tickets',
    description: 'Elimina permanentemente una solicitud de tickets. Esta acción liberará los tickets reservados.'
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID único de la solicitud a eliminar',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Solicitud eliminada exitosamente',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Solicitud de tickets eliminada exitosamente' },
        id: { type: 'number', example: 1 },
        releasedTickets: { type: 'number', example: 3 },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Error al eliminar la solicitud',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'string', example: 'No se puede eliminar una solicitud de una transacción confirmada' },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Solicitud no encontrada',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Solicitud no encontrada' },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  })
  async remove(@Param('id') id: string) {
    try {
      return await this.transactionTicketRequestService.remove(+id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
