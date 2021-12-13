import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';

import { AddShowDto } from './dtos/add-show.dto';
import { GetMatchingShowsDto } from 'src/shows/dtos/get-matching-shows.dto';
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
      relations: ['streamingService', 'country'],
    });
    return shows;
  }

  async find(showDto: GetMatchingShowsDto) {
    const { input } = showDto;
    const countries = await this.repository.find({ title: ILike(`${input}%`) });
    return countries;
  }
}
