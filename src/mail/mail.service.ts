/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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
    host: 'sandbox.smtp.mailtrap.io',
    port: 587,
    secure: false,
    auth: {
      user: '4a23a9b6a34398',
      pass: 'c670f8c3513ad3',
    },
  });

  async sendVoucher(
    validatorEmail: string,
    buyerName: string,
    voucherPath: string,
    totalAmount: number,
    idTransaction: number,
  ): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: `"Soporte" <Eventos>`,
        to: validatorEmail,
        subject: 'Confirmación de pago de entradas',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
                <div style="text-align: center;">
                <img src="cid:logoimg" alt="Logo" style="max-width: 150px; margin-bottom: 20px;" />
                </div>

                <p style="font-size: 16px; color: #333;">Hola <strong>administrador</strong>,</p>

                <p style="font-size: 16px; color: #333;">
                <strong>${buyerName}</strong> compró boletos por un monto de 
                <strong style="color: #2e86de;">${totalAmount}</strong>.
                </p>

                <div style="text-align: center; margin: 30px 0;">
                <a href="http://localhost:3100/transaction/confirm-payment/${idTransaction}" 
                    style="background-color: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-size: 16px;">
                    Validar Pago
                </a>
                </div>

                <p style="font-size: 14px; color: #888; text-align: center;">
                Si la captura no corresponde a una transferencia valida, puedes ignorar este correo.
                </p>
            </div>
            `,
        attachments: [
          {
            filename: voucherPath || 'voucher.png',
            path: `${process.env.PATH_IMAGES || 'D:/rds/images'}/${voucherPath || 'voucher.png'}`,
            cid: 'logoimg',
          },
        ],
      });

      this.logger.log(`Correo enviado a ${validatorEmail}`);
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
