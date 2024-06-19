import { urlSchema } from '@/utils/validations/shortenerSchema';
import { z } from 'zod';

export type Url = z.infer<typeof urlSchema>;
