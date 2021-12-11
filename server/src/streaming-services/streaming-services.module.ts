import { Module } from '@nestjs/common';
import { StreamingServicesController } from './streaming-services.controller';
import { StreamingServicesService } from './streaming-services.service';

@Module({
  controllers: [StreamingServicesController],
  providers: [StreamingServicesService]
})
export class StreamingServicesModule {}
