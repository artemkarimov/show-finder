import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';

import { Show } from 'src/shows/entities/show.entity';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column({ type: 'varchar', nullable: false })
  content: string;

  @ManyToOne(() => Show, show => show.comments)
  show: Show;

  @ManyToOne(() => User, user => user.comments)
  user: User;
}
