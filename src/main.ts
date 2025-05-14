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
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
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
