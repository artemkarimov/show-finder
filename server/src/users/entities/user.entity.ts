import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { Country } from 'src/countries/entities/country.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column({ type: 'varchar', nullable: false })
  firstName: string;

  @Column({ type: 'varchar', nullable: false })
  lastName: string;

  @Column({ type: 'varchar', unique: true, nullable: false })
  userName: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @ManyToOne(() => Country, country => country.users)
  country: Country;
}
