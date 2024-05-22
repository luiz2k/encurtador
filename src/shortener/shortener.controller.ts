import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateShortenerDto } from './dto/create-shortener.dto';
import { ShortenerService } from './shortener.service';

@Controller('shortener')
export class ShortenerController {
  constructor(private readonly shortenerService: ShortenerService) {}

  @Post()
  async create(@Body() createShortenerDto: CreateShortenerDto) {
    return await this.shortenerService.create(createShortenerDto);
  }

  @Get(':shortened_url')
  async redirect(@Param('shortened_url') shortened_url: string) {
    return await this.shortenerService.redirect(shortened_url);
  }

  @Get('details/:shortened_url')
  async findOne(@Param('shortened_url') shortened_url: string) {
    return await this.shortenerService.findOne(shortened_url);
  }
}
