import dotenv from 'dotenv';

const envFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';
dotenv.config({ path: envFile });

const ormConfig = {
  type: process.env.TYPEORM_CONNECTION || 'mysql',
  host: process.env.TYPEORM_HOST || 'localhost',
  port: Number(process.env.TYPEORM_PORT || 3306),
  username: process.env.TYPEORM_USERNAME || 'test',
  password: process.env.TYPEORM_PASSWORD || 'test',
  database: process.env.TYPEORM_DATABASE || 'test',
  entities: [process.env.TYPEORM_ENTITIES || 'src/entity/*.entity.ts'],
  synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
  logging: process.env.TYPEORM_LOGGING === 'true',
};

export default ormConfig;
