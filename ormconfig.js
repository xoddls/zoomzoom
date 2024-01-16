module.exports = {
  name: 'cli',
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number.parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  migrationsTableName: 'Migration',
  entities: ['dist/**/entities/*.entity{.ts,.js}'],
  migrations: ['./src/database/migrations/*.ts'],
  logging: false,
  cli: {
    migrationsDir: 'migrations',
  },
};
