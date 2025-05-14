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

@Module({
  imports: [UserModule, RolModule, EventCategoryModule, TicketCategoryModule, TicketModule, TransactionModule, EventEntityModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'admin',
      database: 'BoleteriaDB',
      autoLoadEntities: true,
      synchronize: true,
    }),
    CategoryManageModule,
    AuthModule,
    UserRolModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
