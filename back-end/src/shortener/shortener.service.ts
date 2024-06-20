import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { init } from '@paralleldrive/cuid2';
import { Repository } from 'typeorm';
import {
  CreateShortenerDto,
  CreateShortenerResponseDto,
} from './dto/create-shortener.dto';
import { RedirectShortenerResponseDto } from './dto/redirect-shortener.dto';
import { ShortenerEntity } from './entities/shortener.entity';
import { GetDetailsShortenerResponseDto } from './dto/get-details-shortener.dto';

@Injectable()
export class ShortenerService {
  constructor(
    @InjectRepository(ShortenerEntity)
    private readonly shortenerRepository: Repository<ShortenerEntity>,
  ) {}

  async create(
    createShortenerDto: CreateShortenerDto,
  ): Promise<CreateShortenerResponseDto> {
    const ID_LENGTH: number = 5;

    const createId = init({
      length: ID_LENGTH,
    });

    let cuid: string;

    const cuidIsExist = async (cuid: string) => {
      const isExist = await this.shortenerRepository.findOne({
        where: {
          shortened_url: cuid,
        },
      });

      return isExist;
    };

    do {
      cuid = createId();
    } while (await cuidIsExist(cuid));

    const isExist = await this.shortenerRepository.findOne({
      where: {
        url: createShortenerDto.url,
      },
    });

    if (isExist) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { _id, ...rest } = isExist;

      return {
        error: false,
        message: 'URL já encurtada anteriormente',
        data: {
          ...rest,
        },
      };
    }

    const data = new ShortenerEntity();

    data.url = createShortenerDto.url;
    data.shortened_url = cuid;
    data.visits = 0;
    data.created_at = Date.now();

    await this.shortenerRepository.save(data);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, ...rest } = data;

    return {
      error: false,
      message: 'URL encurtada',
      data: {
        ...rest,
      },
    };
  }

  async redirect(shortened_url: string): Promise<RedirectShortenerResponseDto> {
    const isExist = await this.shortenerRepository.findOne({
      where: {
        shortened_url: shortened_url,
      },
    });

    if (!isExist) {
      throw new NotFoundException('URL não encontrada');
    }

    await this.shortenerRepository.update(isExist._id, {
      visits: isExist.visits + 1,
    });

    return {
      error: false,
      message: 'URL encontrada',
      data: {
        url: isExist.url,
      },
    };
  }

  async findOne(
    shortened_url: string,
  ): Promise<GetDetailsShortenerResponseDto> {
    const isExist = await this.shortenerRepository.findOne({
      where: {
        shortened_url: shortened_url,
      },
    });

    if (!isExist) {
      throw new NotFoundException('URL não encontrada');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, ...rest } = isExist;

    return {
      error: false,
      message: 'Dados encontrados',
      data: {
        ...rest,
      },
    };
  }
}
