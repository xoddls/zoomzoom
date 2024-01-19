import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();


export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number.parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  entities: ['src/**/entities/*.entity.ts'],
  logging: true,
  migrations: ['./src/database/migrations/*.ts'],
});