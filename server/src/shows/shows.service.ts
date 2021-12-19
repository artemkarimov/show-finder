import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository, ILike } from 'typeorm';

import { AddShowDto } from './dtos/add-show.dto';
import { UpdateSearchCountDto } from './dtos/update-search-count.dto';
import { Show } from './entities/show.entity';

@Injectable()
export class ShowsService {
  constructor(@InjectRepository(Show) private readonly repository: Repository<Show>) {}

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

  async findMatching(input: string) {
    const matchingShows = await this.repository.find({
      relations: ['streamingService', 'country'],
      where: { title: ILike(`${input}%`) },
    });
    return matchingShows;
  }

  async findMostSearched(limit: number) {
    const mostSearchedShows = await getRepository(Show)
      .createQueryBuilder('show')
      .orderBy(`"searchCount"`, 'DESC')
      .limit(limit)
      .getMany();
    return mostSearchedShows;
  }

  async updateSearchCount(dto: UpdateSearchCountDto) {
    const { id } = dto;
    const show = await this.repository.findOne(id);
    const updatedShow: Show = await this.repository.save({
      ...show,
      searchCount: show.searchCount + 1,
    });
    return updatedShow;
  }
}
