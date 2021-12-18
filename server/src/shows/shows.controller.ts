import { Controller, Get, Post, Body, Query } from '@nestjs/common';

import { ShowsService } from './shows.service';
import { AddShowDto } from './dtos/add-show.dto';
import { UpdateSearchCountDto } from './dtos/update-search-count.dto';

@Controller('shows')
export class ShowsController {
  constructor(private readonly service: ShowsService) {}

  @Post()
  async addShows(@Body() body: AddShowDto[]) {
    this.service.create(body);
  }

  @Get()
  async getAllShows() {
    const shows = await this.service.findAll();
    return shows;
  }

  @Get('matching')
  async getMatchingShows(@Query('input') input: string) {
    const matchingShows = await this.service.findMatching(input);
    return matchingShows;
  }

  @Get('most-searched')
  async getMostSearchedShows(@Query('limit') limit: string) {
    const mostSearchedShows = await this.service.findMostSearched(+limit);
    return mostSearchedShows;
  }

  @Post('update-search-count')
  async updateSearchCount(@Body() body: UpdateSearchCountDto) {
    const result = await this.service.updateSearchCount(body);
    return result;
  }
}
