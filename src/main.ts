import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        'http://localhost:3000',
        'http://localhost:5173',
        'https://devtenant1.rastreoweb.net',
        'http://devtenant1.rastreoweb.net',
        'http://localhost:4200',
        'http://localhost:8080',
      ];
      // Permitir si origin está en la lista o si no hay origin (Postman, curl, etc.)
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      // Si quieres, puedes devolver un error aquí para otros origins
      return callback(new Error('Not allowed by CORS'));
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
    allowedHeaders: [
      'Content-Type',
      'Accept',
      'Authorization',
      'ClientMetaDto',
    ],
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
