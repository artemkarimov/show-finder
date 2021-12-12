import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { SubscriptionPrice } from 'src/subscription-prices/entities/subscription-price.entity';

@Entity()
export class Country {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 2, nullable: false })
  iso3166Code: string;

  @OneToMany(
    () => SubscriptionPrice,
    subscriptionPrice => subscriptionPrice.country,
  )
  subscriptionPrices: SubscriptionPrice[];
}
