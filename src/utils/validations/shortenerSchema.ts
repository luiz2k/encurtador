import { z } from 'zod';

export const pathnameSchema = z.object({
  pathname: z.string().length(5, 'Deve conter cinco caracteres'),
});

export const urlSchema = z.object({
  url: z.string().url('URL inválida'),
});

export type SetUrl = {
  original_url: string;
  shortened_url: string;
  pathname: string;
};
