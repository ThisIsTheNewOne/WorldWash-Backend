import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common'; 

const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:4000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  credentials: true, 
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const cors = require('cors'); 
  
  const port = process.env.PORT || 3000; 
  await app.listen(port);
  app.use(cors(corsOptions));

  Logger.log(`NestJS app is running on http://localhost:${port}`, 'Bootstrap');
}
bootstrap();
