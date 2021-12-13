import { NestFactory } from '@nestjs/core';
import { json } from 'body-parser';

import { AppModule } from './app.module';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  app.use(json({ limit: '50mb' }));
  app.enableCors();
  await app.listen(3001);
};

bootstrap();
