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
        host: configService.get<string>('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
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
