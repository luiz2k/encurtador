import { ApiProperty } from '@nestjs/swagger';

export class RedirectShortenerResponseDto {
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
    },
  })
  data: {
    url: string;
  };
}
