import { Controller, Post, Body } from '@nestjs/common';

import { SubscriptionPricesService } from './subscription-prices.service';
import { AddSubscriptionPriceDto } from './dtos/add-subscription-price.dto';

@Controller('subscription-prices')
export class SubscriptionPricesController {
  constructor(private readonly service: SubscriptionPricesService) {}

  @Post()
  async addSubscriptionPrices(@Body() body: AddSubscriptionPriceDto[]) {
    return this.service.create(body);
  }
}
