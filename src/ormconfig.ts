import { DataSourceOptions } from 'typeorm';

export const connectionOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  //port: Number.parseInt(process.env.DB_PORT || '3306', 10),
  port: 3306,
  username: 'zoomzoom',
  password: 'zoomzoom',
  database: 'zoomzoom',
  entities: ["dist/**/**/*.entity{.ts,.js}"],
  logging: process.env.NODE_ENV === 'local',
  synchronize: false,
};
