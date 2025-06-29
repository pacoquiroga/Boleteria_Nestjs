import {
  Injectable,
  InternalServerErrorException,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  private transporter = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: +process.env.NODEMAILER_PORT,
    secure: +process.env.NODEMAILER_PORT == 465,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  });

  async sendPasswordRecoveryEmail(
    ownerEventEmail: string,
    ownerEventName: string,
    ownerTicketName: string,
    totalAmount: string,
  ): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: `"Soporte" <${process.env.NODEMAILER_USER}>`,
        to: ownerEventEmail,
        subject: 'Confimacion de pago de entradas',
        html: `
          <p>Hola ${ownerEventName || 'usuario'},</p>
          <p><strong>${ownerTicketName}</strong> compro boletos por un monto de <strong>${totalAmount}</strong></p>
        `,
      });

      this.logger.log(`Correo enviado a ${ownerEventEmail}`);
    } catch (error) {
      if (error.code === 'ECONNECTION') {
        throw new ServiceUnavailableException(
          'Error de conexión al servidor SMTP',
        );
      }
      this.logger.error(`Error al enviar correo: ${error.message}`);
      throw new InternalServerErrorException('No se pudo enviar el correo');
    }
  }
}
