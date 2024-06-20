import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { HttpCode, HttpStatus } from '@nestjs/common';
import {
  CreateShortenerDto,
  CreateShortenerResponseDto,
} from './dto/create-shortener.dto';
import { ShortenerService } from './shortener.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RedirectShortenerResponseDto } from './dto/redirect-shortener.dto';
import { GetDetailsShortenerResponseDto } from './dto/get-details-shortener.dto';

@ApiTags('shortener')
@Controller('shortener')
export class ShortenerController {
  constructor(private readonly shortenerService: ShortenerService) {}

  @ApiOperation({ summary: 'Criar uma URL encurtada' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'URL encurtada com sucesso',
    type: CreateShortenerResponseDto,
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createShortenerDto: CreateShortenerDto,
  ): Promise<CreateShortenerResponseDto> {
    return await this.shortenerService.create(createShortenerDto);
  }

  @ApiOperation({ summary: 'Obter URL encurtada' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Obteve a URL encurtada com sucesso',
    type: RedirectShortenerResponseDto,
  })
  @Get(':pathname')
  @HttpCode(HttpStatus.OK)
  async redirect(@Param('pathname') pathname: string) {
    return await this.shortenerService.redirect(pathname);
  }

  @ApiOperation({ summary: 'Obter informações de uma URL encurtada' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Obteve as informações com sucesso',
    type: GetDetailsShortenerResponseDto,
  })
  @Get('details/:pathname')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('pathname') pathname: string,
  ): Promise<GetDetailsShortenerResponseDto> {
    return await this.shortenerService.findOne(pathname);
  }
}
