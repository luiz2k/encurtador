import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShortenerModule } from './shortener/shortener.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        type: 'mongodb',
        url: configService.get<string>('MONGODB_URI'),
        synchronize: true,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
      }),

      inject: [ConfigService],
    }),
    ShortenerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
