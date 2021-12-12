import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AddStreamingServiceDto } from './dtos/add-streaming-service.dto';
import { StreamingService } from './entities/streaming-service.entity';

@Injectable()
export class StreamingServicesService {
  constructor(
    @InjectRepository(StreamingService)
    private readonly repository: Repository<StreamingService>,
  ) {}

  async create(addStreamingServicesDtos: AddStreamingServiceDto[]) {
    for (const addStreamingServicesDto of addStreamingServicesDtos) {
      const streamingService = this.repository.create({
        ...addStreamingServicesDto,
      });
      await this.repository.save(streamingService);
    }
  }
}
