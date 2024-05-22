import { Body, Controller, Post } from '@nestjs/common';
import { CreateShortenerDto } from './dto/create-shortener.dto';
import { ShortenerService } from './shortener.service';

@Controller('shortener')
export class ShortenerController {
  constructor(private readonly shortenerService: ShortenerService) {}

  @Post()
  async create(@Body() createShortenerDto: CreateShortenerDto) {
    return await this.shortenerService.create(createShortenerDto);
  }
}
