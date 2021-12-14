import { Controller, Get, Post, Body, Query } from '@nestjs/common';

import { ShowsService } from './shows.service';
import { AddShowDto } from './dtos/add-show.dto';
import { GetMatchingShowsDto } from 'src/shows/dtos/get-matching-shows.dto';

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
  async getMatchingShows(@Query() query: GetMatchingShowsDto) {
    return this.service.find(query);
  }

  @Get('most-searched')
  async getMostSearchedShows(@Query('limit') limit: string) {
    const mostSearchedShows = await this.service.findMostSearched(+limit);
    return mostSearchedShows;
  }
}
