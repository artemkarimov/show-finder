import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class StreamingService {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  logo: string;
}
