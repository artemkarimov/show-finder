import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StreamingService } from './entities/streaming-service.entity';

import { StreamingServicesController } from './streaming-services.controller';
import { StreamingServicesService } from './streaming-services.service';

@Module({
  controllers: [StreamingServicesController],
  providers: [StreamingServicesService],
  imports: [TypeOrmModule.forFeature([StreamingService])],
})
export class StreamingServicesModule {}
