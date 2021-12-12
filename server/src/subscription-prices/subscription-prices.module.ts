import { Module } from '@nestjs/common';
import { SubscriptionPricesController } from './subscription-prices.controller';
import { SubscriptionPricesService } from './subscription-prices.service';

@Module({
  controllers: [SubscriptionPricesController],
  providers: [SubscriptionPricesService]
})
export class SubscriptionPricesModule {}
