import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { SubscriptionPrice } from 'src/subscription-prices/entities/subscription-price.entity';

@Entity()
export class SubscriptionPlan {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @OneToMany(
    () => SubscriptionPrice,
    subscriptionPrice => subscriptionPrice.streamingService,
  )
  subscriptionPrices: SubscriptionPrice[];
}
