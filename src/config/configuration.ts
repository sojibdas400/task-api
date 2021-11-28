import * as path from 'path';

export default () => ({
  port: process.env.PORT,
  database: {
    type: 'postgres',
    host: process.env.PG_HOST,
    port: parseInt(process.env.PG_PORT),
    username: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,
    database: process.env.DB_NAME,
    entities: [path.resolve('dist/**/*.entity{.ts,.js}')],
    logging: false,
    synchronize: true,
    autoLoadEntities: true,
    keepConnectionAlive: false,
  },
  jwtSecret: process.env.JWT_SECRET,
  spacesEndpoint: process.env.SPACES_ENDPOINT,
  spacesAccessKeyId: process.env.SPACES_ACCESS_KEY_ID,
  spacesAccessSecret: process.env.SPACES_ACCESS_SECRET,
  spacesBucketName: process.env.SPACES_BUCKET_NAME,
  spacesAcl: process.env.SPACES_ACL,
});
