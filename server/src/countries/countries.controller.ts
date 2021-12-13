import { Controller, Get, Post, Body, Query } from '@nestjs/common';

import { CountriesService } from './countries.service';
import { AddCountryDto } from './dtos/add-country.dto';
import { GetCountryDto } from './dtos/get-country.dto';

@Controller('countries')
export class CountriesController {
  constructor(private readonly service: CountriesService) {}

  @Post()
  async addCountries(@Body() body: AddCountryDto[]) {
    return this.service.create(body);
  }

  @Get()
  async getCountry(@Query() query: GetCountryDto) {
    return this.service.findOne(query);
  }
}
