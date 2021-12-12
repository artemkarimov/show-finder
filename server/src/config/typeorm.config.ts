import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { Show } from 'src/shows/entities/show.entity';
import { StreamingService } from 'src/streaming-services/entities/streaming-service.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'showfinder',
  entities: [Show, StreamingService],
  synchronize: true,
};
