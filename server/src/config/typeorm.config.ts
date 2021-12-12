import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { Show } from 'src/shows/entities/show.entity';
import { StreamingService } from 'src/streaming-services/entities/streaming-service.entity';
import { Country } from 'src/countries/entities/country.entity';
import { SubscriptionPlan } from 'src/subscription-plans/entities/subscription-plan.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'showfinder',
  entities: [Show, StreamingService, Country, SubscriptionPlan],
  synchronize: true,
};
