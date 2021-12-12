import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.service';
import { Country } from './entities/country.entity';

@Module({
  controllers: [CountriesController],
  providers: [CountriesService],
  imports: [TypeOrmModule.forFeature([Country])],
})
export class CountriesModule {}
