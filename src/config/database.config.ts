import * as path from 'path';

export default {
  type: 'postgres',
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  username: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  database: process.env.DB_NAME,
  entities: [path.resolve('dist/**/*.entity{.ts,.js}')],
  logging: false,
  synchronize: true,
  force: true,
  autoLoadEntities: true,
  keepConnectionAlive: false,
};
