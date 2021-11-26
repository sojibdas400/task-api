import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {Logger} from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3003);
  logger.log(`Application listening on port 3003`, 'Create Rest Api')
}
bootstrap();
