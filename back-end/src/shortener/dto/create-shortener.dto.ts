import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateShortenerDto {
  @IsString({ message: 'URL deve ser uma string' })
  @IsUrl({}, { message: 'URL inválida' })
  @IsNotEmpty({ message: 'URL é obrigatória' })
  @ApiProperty({ description: 'URL a ser encurtada' })
  url: string;
}

export class CreateShortenerResponseDto {
  @ApiProperty({
    description: 'Indica se houve erro na requisição',
    default: false,
  })
  error: boolean;

  @ApiProperty({ description: 'Mensagem da solicitaçao' })
  message: string;

  @ApiProperty({
    description: 'Dados da URL encurtada',
    type: 'object',
    properties: {
      url: { type: 'string' },
      shortened_url: { type: 'string' },
      visits: { type: 'number' },
      created_at: { type: 'string' },
    },
  })
  data: {
    url: string;
    shortened_url: string;
    visits: number;
    created_at: number;
  };
}
