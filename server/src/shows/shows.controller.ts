import { Controller, Post, Body } from '@nestjs/common';

import { ShowsService } from './shows.service';
import { AddShowDto } from './dtos/add-show.dto';

@Controller('shows')
export class ShowsController {
  constructor(private readonly service: ShowsService) {}

  @Post()
  async addShows(@Body() body: AddShowDto[]) {
    this.service.create(body);
  }
}
