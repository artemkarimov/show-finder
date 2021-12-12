import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { AddCountryDto } from './dtos/add-country.dto';
import { Country } from './entities/country.entity';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(Country) private readonly repository: Repository<Country>,
  ) {}

  async create(countryDtos: AddCountryDto[]) {
    for (const countryDto of countryDtos) {
      const country = this.repository.create({ ...countryDto });
      await this.repository.save(country);
    }
  }
}
