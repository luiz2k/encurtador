import { Module } from '@nestjs/common';
import { ShortenerController } from './shortener.controller';
import { ShortenerService } from './shortener.service';
import { ShortenerEntity } from './entities/shortener.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ShortenerEntity])],
  controllers: [ShortenerController],
  providers: [ShortenerService],
})
export class ShortenerModule {}
