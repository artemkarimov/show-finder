import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { ShowsModule } from './shows/shows.module';
import { typeOrmConfig } from './config/typeorm.config';
import { StreamingServicesModule } from './streaming-services/streaming-services.module';
import { CountriesModule } from './countries/countries.module';
import { SubscriptionPlansModule } from './subscription-plans/subscription-plans.module';

@Module({
  controllers: [AppController],
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ShowsModule,
    StreamingServicesModule,
    CountriesModule,
    SubscriptionPlansModule,
  ],
})
export class AppModule {}
