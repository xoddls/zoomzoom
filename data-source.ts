import { DataSource } from 'typeorm';


export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: 3306,
  username: 'zoomzoom',
  password: 'zoomzoom',
  database: 'zoomzoom',
  synchronize: false,
  entities: ['src/**/entities/*.entity.ts'],
  logging: true,
  migrations: ['./src/database/migrations/*.ts'],
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });