import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_PORT,
  password: process.env.DATABASE_PORT,
  database: process.env.DATABASE_PORT,
  synchronize: false,
  logging: true,
  entities: ['src/**/entities/*.entity.{js,ts}'],
  migrations: ['src/**/migrations/*.{js,ts}'],
});
