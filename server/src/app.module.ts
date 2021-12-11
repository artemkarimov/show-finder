import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ShowsModule } from './shows/shows.module';

@Module({
  controllers: [AppController],
  imports: [ShowsModule],
})
export class AppModule {}
