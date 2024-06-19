import { pathnameSchema } from '@/utils/validations/shortenerSchema';
import { z } from 'zod';

export type Url = z.infer<typeof pathnameSchema>;

export type Data = {
  url: string;
  shortened_url: string;
  visits: number;
  created_at: string;
};
