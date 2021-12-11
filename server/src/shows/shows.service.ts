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

  async create(addShowDtos: AddShowDto[]) {
    for (const addShowDto of addShowDtos) {
      const show = this.repository.create({ ...addShowDto });
      this.repository.save(show);
    }
  }
}
