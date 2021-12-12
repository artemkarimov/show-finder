import { Controller, Post, Body } from '@nestjs/common';

import { StreamingServicesService } from './streaming-services.service';
import { AddStreamingServiceDto } from './dtos/add-streaming-service.dto';

@Controller('streaming-services')
export class StreamingServicesController {
  constructor(private readonly service: StreamingServicesService) {}

  @Post()
  async addStreamingServices(@Body() body: AddStreamingServiceDto[]) {
    return await this.service.create(body);
  }
}
