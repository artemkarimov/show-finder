import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';

import { Country } from 'src/countries/entities/country.entity';
import { Comment } from 'src/comments/entities/comment.entity';

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
  @Exclude()
  password: string;

  @ManyToOne(() => Country, country => country.users)
  country: Country;

  @OneToMany(() => Comment, comment => comment.user)
  comments: Comment[];

  @Column()
  countryId: number;
}
