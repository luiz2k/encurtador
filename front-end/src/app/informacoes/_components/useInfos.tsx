import { useState } from 'react';
import { Data, Url } from './types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { pathnameSchema } from '@/utils/validations/shortenerSchema';
import { getShortenUrlInfo } from '@/services/shortener';

export function useInfos() {
  const [data, setData] = useState<null | Data>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<Url>({
    resolver: zodResolver(pathnameSchema),
  });

  const onSubmit = async (data: Url) => {
    try {
      const infos = await getShortenUrlInfo(data.pathname);

      setData(infos.data);
    } catch (error) {
      setError('pathname', { message: 'URL não encontrada' });
    }
  };

  return { onSubmit, register, handleSubmit, errors, isSubmitting, data };
}
