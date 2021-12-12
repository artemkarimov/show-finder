import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { Show } from 'src/shows/entities/show.entity';
import { SubscriptionPrice } from 'src/subscription-prices/entities/subscription-price.entity';

@Entity()
export class StreamingService {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  logo: string;

  @OneToMany(() => Show, show => show.streamingService)
  shows: Show[];

  @OneToMany(
    () => SubscriptionPrice,
    subscriptionPrice => subscriptionPrice.subscriptionPlan,
  )
  subscriptionPrices: SubscriptionPrice[];
}
