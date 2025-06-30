import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ResponseTransactionDto } from './dto/response-transaction.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';

@ApiTags('💳 Transacciones')
@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @ApiOperation({ 
    summary: 'Crear una nueva transacción',
    description: 'Crea una nueva transacción de compra de tickets para un evento'
  })
  @ApiBody({
    type: CreateTransactionDto,
    description: 'Datos de la transacción a crear',
    examples: {
      transaccion_usuario_registrado: {
        summary: 'Transacción de usuario registrado',
        description: 'Ejemplo de transacción para un usuario con cuenta',
        value: {
          totalAmount: 150.00,
          paymentMethod: 'CREDIT_CARD',
          ownerId: 1,
          ownerEmail: 'usuario@email.com',
          ownerName: 'Juan',
          ownerLastname: 'Pérez',
          ownerCi: '12345678',
          eventId: 1
        }
      },
      transaccion_invitado: {
        summary: 'Transacción de invitado',
        description: 'Ejemplo de transacción para un usuario sin cuenta',
        value: {
          totalAmount: 100.00,
          paymentMethod: 'BANK_TRANSFER',
          ownerEmail: 'invitado@email.com',
          ownerName: 'María',
          ownerLastname: 'González',
          ownerCi: '87654321',
          eventId: 2
        }
      }
    }
  })
  @ApiResponse({
    status: 201,
    description: 'Transacción creada exitosamente',
    type: ResponseTransactionDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos o evento no disponible',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'string', example: 'El evento no está disponible para compra' },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
  })
  async create(@Body() createTransactionDto: CreateTransactionDto) {
    try {
      return await this.transactionService.create(createTransactionDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @ApiOperation({ 
    summary: 'Obtener todas las transacciones',
    description: 'Retorna una lista con todas las transacciones registradas en el sistema'
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de transacciones obtenida exitosamente',
    type: [ResponseTransactionDto],
  })
  @ApiResponse({
    status: 500,
    description: 'Error interno del servidor',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 500 },
        message: { type: 'string', example: 'Error al obtener las transacciones' },
        error: { type: 'string', example: 'Internal Server Error' },
      },
    },
  })
  async findAll() {
    try {
      return await this.transactionService.findAll();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Obtener transacción por ID',
    description: 'Retorna los detalles de una transacción específica'
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID único de la transacción',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Transacción encontrada exitosamente',
    type: ResponseTransactionDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Transacción no encontrada',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Transacción con ID 1 no encontrada' },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  })
  async findOne(@Param('id') id: string) {
    try {
      return await this.transactionService.findOne(+id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Patch(':id')
  @ApiOperation({ 
    summary: 'Actualizar transacción y subir comprobante',
    description: 'Actualiza los datos de una transacción y permite subir un comprobante de pago'
  })
  @ApiConsumes('multipart/form-data')
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID único de la transacción a actualizar',
    example: 1,
  })
  @ApiBody({
    description: 'Datos de la transacción a actualizar y archivo de comprobante (opcional)',
    schema: {
      type: 'object',
      properties: {
        state: {
          type: 'string',
          description: 'Nuevo estado de la transacción',
          example: 'CONFIRMED',
        },
        paymentMethod: {
          type: 'string',
          description: 'Método de pago actualizado',
          example: 'BANK_TRANSFER',
        },
        voucher: {
          type: 'string',
          format: 'binary',
          description: 'Archivo de comprobante de pago (imagen)',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Transacción actualizada exitosamente',
    type: ResponseTransactionDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos o archivo no válido',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'string', example: 'El archivo debe ser una imagen válida' },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Transacción no encontrada',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Transacción no encontrada' },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('voucher', {
      storage: diskStorage({
        destination: process.env.PATH_IMAGES || 'D:/rds/images',
        filename: (req, file: Express.Multer.File, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `voucher-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    try {
      const voucherPath = file?.filename ?? null;
      return await this.transactionService.update(+id, {
        ...updateTransactionDto,
        ...(voucherPath && { voucherPath }),
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  @ApiOperation({ 
    summary: 'Eliminar transacción',
    description: 'Elimina permanentemente una transacción del sistema. Esta acción no se puede deshacer.'
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID único de la transacción a eliminar',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Transacción eliminada exitosamente',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Transacción eliminada exitosamente' },
        id: { type: 'number', example: 1 },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Error al eliminar la transacción',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'string', example: 'No se puede eliminar una transacción confirmada' },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Transacción no encontrada',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Transacción no encontrada' },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  })
  async remove(@Param('id') id: string) {
    try {
      return await this.transactionService.remove(+id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('confirm-payment/:id')
  @ApiOperation({ 
    summary: 'Confirmar pago de transacción',
    description: 'Confirma el pago de una transacción cambiando su estado a confirmado'
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID único de la transacción a confirmar',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Pago confirmado exitosamente',
    type: ResponseTransactionDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Error al confirmar el pago',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'string', example: 'La transacción ya está confirmada' },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Transacción no encontrada',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Transacción no encontrada' },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  })
  async confirmPayment(@Param('id') id: string) {
    try {
      return await this.transactionService.confirmPayment(+id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
