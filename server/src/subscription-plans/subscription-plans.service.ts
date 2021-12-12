import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SubscriptionPlan } from './entities/subscription-plan.entity';
import { AddSubscriptionPlanDto } from './dtos/add-subsription-plan.dto';

@Injectable()
export class SubscriptionPlansService {
  constructor(
    @InjectRepository(SubscriptionPlan)
    private readonly repository: Repository<SubscriptionPlan>,
  ) {}

  async create(subscriptionPlanDtos: AddSubscriptionPlanDto[]) {
    for (const subscriptionPlanDto of subscriptionPlanDtos) {
      const subscriptionPlan = this.repository.create({
        ...subscriptionPlanDto,
      });
      await this.repository.save(subscriptionPlan);
    }
  }
}
