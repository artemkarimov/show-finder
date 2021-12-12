import { Body, Controller, Post } from '@nestjs/common';

import { CountriesService } from './countries.service';
import { AddCountryDto } from './dtos/add-country.dto';

@Controller('countries')
export class CountriesController {
  constructor(private readonly service: CountriesService) {}

  @Post()
  async addCountries(@Body() body: AddCountryDto[]) {
    return this.service.create(body);
  }
}
