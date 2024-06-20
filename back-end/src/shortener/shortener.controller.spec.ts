import { Test, TestingModule } from '@nestjs/testing';
import { ShortenerController } from './shortener.controller';
import { ShortenerEntity } from './entities/shortener.entity';
import { ObjectId } from 'mongodb';
import { ShortenerService } from './shortener.service';

const shortenerEntity: ShortenerEntity[] = [
  new ShortenerEntity({
    _id: new ObjectId(),
    url: 'https://www.google.com',
    shortened_url: 'sfc5g',
    visits: 45,
    created_at: Date.now(),
  }),
  new ShortenerEntity({
    _id: new ObjectId(),
    url: 'https://www.example.com',
    shortened_url: 'bx39v',
    visits: 17,
    created_at: Date.now(),
  }),
  new ShortenerEntity({
    _id: new ObjectId(),
    url: 'https://www.test.com',
    shortened_url: 'gh67d',
    visits: 0,
    created_at: Date.now(),
  }),
  new ShortenerEntity({
    _id: new ObjectId(),
    url: 'https://www.sample.com',
    shortened_url: 'kl45s',
    visits: 23,
    created_at: Date.now(),
  }),
];

const newShortenerEntity = new ShortenerEntity({
  url: 'https://www.anotherexample.com',
  shortened_url: 'xy12z',
  visits: 5,
  created_at: Date.now(),
});

describe('ShortenerController', () => {
  let controller: ShortenerController;
  let service: ShortenerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShortenerController],
      providers: [
        {
          provide: ShortenerService,
          useValue: {
            create: jest.fn().mockResolvedValue(newShortenerEntity),
            redirect: jest.fn().mockResolvedValue(shortenerEntity[0]),
            findOne: jest.fn().mockResolvedValue(shortenerEntity[2]),
          },
        },
      ],
    }).compile();

    controller = module.get<ShortenerController>(ShortenerController);
    service = module.get<ShortenerService>(ShortenerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('Deve encurtar uma URL', async () => {
      const url = 'https://www.anotherexample.com';
      const shortened = await controller.create({ url });

      expect(shortened).toEqual(newShortenerEntity);
      expect(service.create).toHaveBeenCalledTimes(1);
      expect(service.create).toHaveBeenCalled();
    });

    it('Deve retornar um error', async () => {
      const url = 'https://www.demo.com';

      jest.spyOn(service, 'create').mockRejectedValueOnce(new Error());

      expect(controller.create({ url })).rejects.toThrow();
    });
  });

  describe('redirect', () => {
    it('Deve retornar uma URL encurtada existente', async () => {
      const shortened_url = 'sfc5g';
      const shortened = await controller.redirect(shortened_url);

      expect(shortened).toEqual(shortenerEntity[0]);
    });

    it('Deve retornar um error', async () => {
      const shortened_url = 'sfc5g';

      jest.spyOn(service, 'redirect').mockRejectedValueOnce(new Error());

      expect(controller.redirect(shortened_url)).rejects.toThrow();
    });
  });

  describe('findOne', () => {
    it('Deve retornar informações de uma URL encurtada existente', async () => {
      const shortened_url = 'sfc5g';
      const shortened = await controller.findOne(shortened_url);

      expect(shortened).toEqual(shortenerEntity[2]);
    });

    it('Deve retornar um error', async () => {
      const shortened_url = 'sfc5g';

      jest.spyOn(service, 'findOne').mockRejectedValueOnce(new Error());

      expect(controller.findOne(shortened_url)).rejects.toThrow();
    });
  });
});
