import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { ShowsModule } from './shows/shows.module';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
  controllers: [AppController],
  imports: [TypeOrmModule.forRoot(typeOrmConfig), ShowsModule],
})
export class AppModule {}
