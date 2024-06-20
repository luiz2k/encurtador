import { urlSchema } from '@/utils/validations/shortenerSchema';
import { z } from 'zod';

export type Url = z.infer<typeof urlSchema>;

export type ShortenedUrlProps = {
  shortened_url: string;
  original_url: string;
};
