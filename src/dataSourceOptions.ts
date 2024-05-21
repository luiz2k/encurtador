import { DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mongodb',
  host: 'localhost',
  port: 27017,
  username: '',
  password: '',
  database: 'shortener',
  synchronize: true,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
};
