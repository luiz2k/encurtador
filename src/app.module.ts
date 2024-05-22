import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './dataSourceOptions';
import { ShortenerModule } from './shortener/shortener.module';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), ShortenerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
