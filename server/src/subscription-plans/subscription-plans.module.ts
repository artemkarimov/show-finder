import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SubscriptionPlansController } from './subscription-plans.controller';
import { SubscriptionPlansService } from './subscription-plans.service';
import { SubscriptionPlan } from './entities/subscription-plan.entity';

@Module({
  controllers: [SubscriptionPlansController],
  providers: [SubscriptionPlansService],
  imports: [TypeOrmModule.forFeature([SubscriptionPlan])],
})
export class SubscriptionPlansModule {}
