import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateShortenerDto {
  @IsString({ message: 'URL deve ser uma string' })
  @IsUrl({}, { message: 'URL inválida' })
  @IsNotEmpty({ message: 'URL é obrigatória' })
  url: string;
}
