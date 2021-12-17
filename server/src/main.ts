import { NestFactory } from '@nestjs/core';
import { json } from 'body-parser';
const cookieSession = require('cookie-session');

import { AppModule } from './app.module';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  app.use(json({ limit: '50mb' }));
  app.use(cookieSession({ keys: ['asdfqwer'] }));
  app.enableCors({ credentials: true, origin: 'http://localhost:3000' });
  await app.listen(3001);
};

bootstrap();
