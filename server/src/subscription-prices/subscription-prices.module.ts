import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SubscriptionPricesController } from './subscription-prices.controller';
import { SubscriptionPricesService } from './subscription-prices.service';
import { SubscriptionPrice } from './entities/subscription-price.entity';

@Module({
  controllers: [SubscriptionPricesController],
  providers: [SubscriptionPricesService],
  imports: [TypeOrmModule.forFeature([SubscriptionPrice])],
})
export class SubscriptionPricesModule {}
