import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

import { StreamingService } from 'src/streaming-services/entities/streaming-service.entity';
import { Country } from 'src/countries/entities/country.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { ShowType } from '../types/show-type.type';

@Entity()
export class Show {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'varchar', length: 6, nullable: false })
  type: ShowType;

  @Column({ type: 'varchar', array: true, nullable: false })
  genre: string[];

  @Column({ type: 'integer', nullable: true })
  releaseYear: number;

  @Column({ type: 'varchar', length: 12, nullable: true })
  releaseYears: string;

  @Column({ type: 'varchar', nullable: false })
  language: string;

  @Column({ type: 'integer', nullable: false })
  runtime: number;

  @Column({ type: 'integer', nullable: true })
  totalSeasons: number;

  @Column({ type: 'varchar', nullable: true })
  poster: string;

  @Column({ type: 'varchar', nullable: false })
  plot: string;

  @Column({ type: 'integer', nullable: false, default: 0 })
  searchCount: number;

  @ManyToOne(() => StreamingService, streamingService => streamingService.shows)
  streamingService: StreamingService;

  @ManyToOne(() => Country, country => country.shows)
  country: Country;

  @OneToMany(() => Comment, comment => comment.show)
  comments: Comment[];
}
