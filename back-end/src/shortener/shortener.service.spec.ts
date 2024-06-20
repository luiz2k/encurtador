import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { Repository } from 'typeorm';
import { ShortenerEntity } from './entities/shortener.entity';
import { ShortenerService } from './shortener.service';
import { NotFoundException } from '@nestjs/common';

const shortenerEntity: ShortenerEntity[] = [
  new ShortenerEntity({
    _id: new ObjectId(),
    url: 'https://www.google.com',
    shortened_url: 'sfc5g',
    visits: 45,
    created_at: 1633036800000,
  }),
  new ShortenerEntity({
    _id: new ObjectId(),
    url: 'https://www.example.com',
    shortened_url: 'bx39v',
    visits: 17,
    created_at: 1633123200000,
  }),
  new ShortenerEntity({
    _id: new ObjectId(),
    url: 'https://www.test.com',
    shortened_url: 'gh67d',
    visits: 0,
    created_at: 1633209600000,
  }),
  new ShortenerEntity({
    _id: new ObjectId(),
    url: 'https://www.sample.com',
    shortened_url: 'kl45s',
    visits: 23,
    created_at: 1633296000000,
  }),
  new ShortenerEntity({
    _id: new ObjectId(),
    url: 'https://www.demo.com',
    shortened_url: 'qw12f',
    visits: 2,
    created_at: 1633382400000,
  }),
];

describe('ShortenerService', () => {
  let service: ShortenerService;
  let repository: Repository<ShortenerEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShortenerService,
        {
          provide: getRepositoryToken(ShortenerEntity),
          useValue: {
            create: jest.fn(),
            findOne: jest.fn((criteria) =>
              shortenerEntity.find((entity) => {
                return Object.keys(criteria.where).every(
                  (key) => entity[key] === criteria.where[key],
                );
              }),
            ),
            update: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ShortenerService>(ShortenerService);
    repository = module.get<Repository<ShortenerEntity>>(
      getRepositoryToken(ShortenerEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('Deve encurtar uma URL', async () => {
      const url = 'https://www.novaurl.com';
      const shortened = await service.create({ url });

      expect(shortened.message).toEqual('URL encurtada');
      expect(shortened.data).toHaveProperty('url');
      expect(shortened.data).toHaveProperty('shortened_url');
    });

    it('Deve retornar uma URL já encurtada anteriormente', async () => {
      const url = 'https://www.example.com';
      const shortened = await service.create({ url });

      expect(shortened.message).toEqual('URL já encurtada anteriormente');
      expect(shortened.data.url).toEqual('https://www.example.com');
      expect(shortened.data.shortened_url).toEqual('bx39v');
    });
  });

  describe('redirect', () => {
    it('Deve retornar uma URL encurtada existente', async () => {
      const shortened_url = 'sfc5g';
      const shortened = await service.redirect(shortened_url);

      expect(shortened.message).toEqual('URL encontrada');
    });

    it('Deve retornar um error de URL inexistente', async () => {
      const shortened_url = 'scgh5';
      const shortened = service.redirect(shortened_url);

      expect(shortened).rejects.toThrow(
        new NotFoundException('URL não encontrada'),
      );
    });
  });

  describe('findOne', () => {
    it('Deve retornar uma URL encurtada existente', async () => {
      const shortened_url = 'qw12f';
      const shortened = await service.findOne(shortened_url);

      expect(shortened.message).toEqual('Dados encontrados');
      expect(shortened.data.url).toEqual('https://www.demo.com');
      expect(shortened.data.shortened_url).toEqual('qw12f');
      expect(shortened.data.visits).toEqual(2);
      expect(shortened.data.created_at).toEqual(1633382400000);
    });

    it('Deve retornar um error de URL não encontrada', async () => {
      const shortened_url = 'gcb3t';
      const shortened = service.findOne(shortened_url);

      expect(shortened).rejects.toThrow(
        new NotFoundException('URL não encontrada'),
      );
    });
  });
});
