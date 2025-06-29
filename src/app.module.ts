import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { RolModule } from './rol/rol.module';
import { EventCategoryModule } from './event_category/eventCategory.module';
import { TicketCategoryModule } from './ticket_category/ticketCategory.module';
import { TicketModule } from './ticket/ticket.module';
import { TransactionModule } from './transaction/transaction.module';
import { EventEntityModule } from './event_entity/eventEntity.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryManageModule } from './category_manage/categoryManage.module';
import { AuthModule } from './auth/auth.module';
import { UserRolModule } from './user_rol/user_rol.module';
import { ConfigModule } from '@nestjs/config';
import { TransactionTicketRequestModule } from './transaction_ticket_request/transaction_ticket_request.module';
import { MailService } from './mail/mail.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    RolModule,
    EventCategoryModule,
    TicketCategoryModule,
    TicketModule,
    TransactionModule,
    EventEntityModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +(process.env.DB_PORT || 5432),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
    CategoryManageModule,
    AuthModule,
    UserRolModule,
    TransactionTicketRequestModule,
  ],
  controllers: [AppController],
  providers: [AppService, MailService],
})
export class AppModule {}
