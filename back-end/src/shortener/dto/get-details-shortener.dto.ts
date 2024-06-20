import { ApiProperty } from '@nestjs/swagger';

export class GetDetailsShortenerResponseDto {
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
      created_at: { type: 'number' },
    },
  })
  data: {
    url: string;
    shortened_url: string;
    visits: number;
    created_at: number;
  };
}
