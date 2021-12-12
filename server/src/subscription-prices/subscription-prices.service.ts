import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AddSubscriptionPriceDto } from './dtos/add-subscription-price.dto';
import { SubscriptionPrice } from './entities/subscription-price.entity';

@Injectable()
export class SubscriptionPricesService {
  constructor(
    @InjectRepository(SubscriptionPrice)
    private readonly repository: Repository<SubscriptionPrice>,
  ) {}

  async create(subscriptionPriceDtos: AddSubscriptionPriceDto[]) {
    for (const subscriptionPriceDto of subscriptionPriceDtos) {
      const subsriptionPrice = this.repository.create({
        ...subscriptionPriceDto,
      });
      await this.repository.save(subsriptionPrice);
    }
  }

  async findAll() {
    const subscriptionPrices = await this.repository.find({
      relations: ['streamingService', 'country', 'subscriptionPlan'],
    });
    return subscriptionPrices;
  }
}
