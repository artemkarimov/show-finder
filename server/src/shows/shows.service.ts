import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AddShowDto } from './dtos/add-show.dto';
import { Show } from './entities/show.entity';

@Injectable()
export class ShowsService {
  constructor(
    @InjectRepository(Show) private readonly repository: Repository<Show>,
  ) {}

  async create(showDtos: AddShowDto[]) {
    for (const showDto of showDtos) {
      const show = this.repository.create({ ...showDto });
      await this.repository.save(show);
    }
  }

  async findAll() {
    const shows = await this.repository.find({
      relations: ['streamingService'],
    });
    return shows;
  }
}
