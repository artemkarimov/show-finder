import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ type: 'varchar', length: 6, nullable: true })
  releaseYears: string;

  @Column({ type: 'varchar', nullable: false })
  country: string;

  @Column({ type: 'varchar', nullable: false })
  language: string;

  @Column({ type: 'integer', nullable: false })
  runtime: number;

  @Column({ type: 'integer', nullable: true })
  totalSeasons: number;

  @Column({ type: 'varchar', nullable: false })
  plot: string;
}
