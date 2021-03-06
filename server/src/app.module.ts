import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ShowsModule } from './shows/shows.module';
import { typeOrmConfig } from './config/typeorm.config';
import { StreamingServicesModule } from './streaming-services/streaming-services.module';
import { CountriesModule } from './countries/countries.module';
import { SubscriptionPlansModule } from './subscription-plans/subscription-plans.module';
import { SubscriptionPricesModule } from './subscription-prices/subscription-prices.module';
import { UsersModule } from './users/users.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ShowsModule,
    StreamingServicesModule,
    CountriesModule,
    SubscriptionPlansModule,
    SubscriptionPricesModule,
    UsersModule,
    CommentsModule,
  ],
})
export class AppModule {}
