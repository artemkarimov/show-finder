import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { Show } from 'src/shows/entities/show.entity';
import { StreamingService } from 'src/streaming-services/entities/streaming-service.entity';
import { Country } from 'src/countries/entities/country.entity';
import { SubscriptionPlan } from 'src/subscription-plans/entities/subscription-plan.entity';
import { SubscriptionPrice } from 'src/subscription-prices/entities/subscription-price.entity';
import { User } from 'src/users/entities/user.entity';
import { Comment } from 'src/comments/entities/comment.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'showfinder',
  entities: [Show, StreamingService, Country, SubscriptionPlan, SubscriptionPrice, User, Comment],
  synchronize: true,
};
