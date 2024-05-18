import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { urlencoded, json } from 'express';

const corsOptions = {
  origin: '*', 
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  console.log(process.env.DB_USER)
  const cors = require('cors');
  app.use(cors(corsOptions));
  await app.listen(3000);

}
bootstrap();
