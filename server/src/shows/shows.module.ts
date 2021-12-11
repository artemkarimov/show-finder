import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShowsController } from './shows.controller';
import { ShowsService } from './shows.service';
import { Show } from './entities/show.entity';

@Module({
  controllers: [ShowsController],
  providers: [ShowsService],
  imports: [TypeOrmModule.forFeature([Show])],
})
export class ShowsModule {}
