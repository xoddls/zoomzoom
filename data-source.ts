import { DataSource } from 'typeorm';


export default new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'zoomzoom',
  password: 'zoomzoom',
  database: 'zoomzoom',
  synchronize: false,
  entities: ['src/**/entities/*.entity.ts'],
  migrations: ['./src/database/migrations/*.ts'],
});
