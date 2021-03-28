import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { authSessionBootstrap } from './auth-session/auth-session.bootstrap';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  authSessionBootstrap(app);
  await app.listen(3000);
}

bootstrap();
