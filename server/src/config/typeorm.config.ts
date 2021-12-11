import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { Show } from 'src/shows/entities/show.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'showfinder',
  entities: [Show],
  synchronize: true,
};
