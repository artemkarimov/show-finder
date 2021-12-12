import { Body, Controller, Post } from '@nestjs/common';
import { AddSubscriptionPlanDto } from './dtos/add-subsription-plan.dto';

import { SubscriptionPlansService } from './subscription-plans.service';

@Controller('subscription-plans')
export class SubscriptionPlansController {
  constructor(private readonly service: SubscriptionPlansService) {}

  @Post()
  async addSubscriptionPlans(@Body() body: AddSubscriptionPlanDto[]) {
    return this.service.create(body)
  }
}
