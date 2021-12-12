import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { StreamingService } from 'src/streaming-services/entities/streaming-service.entity';
import { Country } from 'src/countries/entities/country.entity';
import { SubscriptionPlan } from 'src/subscription-plans/entities/subscription-plan.entity';

@Entity()
export class SubscriptionPrice {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column()
  cost: string;

  @ManyToOne(
    () => StreamingService,
    streamingService => streamingService.subscriptionPrices,
  )
  streamingService: StreamingService;

  @ManyToOne(() => Country, country => country.subscriptionPrices)
  country: StreamingService;

  @ManyToOne(
    () => SubscriptionPlan,
    subscriptionPlan => subscriptionPlan.subscriptionPrices,
  )
  subscriptionPlan: SubscriptionPlan;
}
