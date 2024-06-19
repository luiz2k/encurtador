import { SetUrl, urlSchema } from '@/utils/validations/shortenerSchema';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Url } from './types';
import { zodResolver } from '@hookform/resolvers/zod';
import { shortenUrl } from '@/services/shortener';

export function useShortener() {
  const getLocalStorage =
    typeof window !== 'undefined' && localStorage.getItem('url');
  const localStorageData: SetUrl[] =
    JSON.parse(getLocalStorage as string) || [];

  const [shortenedUrls, setShortenedUrls] =
    useState<SetUrl[]>(localStorageData);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<Url>({
    resolver: zodResolver(urlSchema),
  });

  const url: string = typeof window !== 'undefined' ? window.location.href : '';

  const onSubmit = async (data: Url) => {
    try {
      const shortenedUrl = await shortenUrl(data.url);

      const filter = localStorageData.filter(
        (item) => item.pathname === shortenedUrl.data.shortened_url,
      );

      if (filter[0]) {
        return;
      }

      setShortenedUrls((prev) => [
        {
          original_url: shortenedUrl.data.url,
          shortened_url: `${url}${shortenedUrl.data.shortened_url}`,
          pathname: shortenedUrl.data.shortened_url,
        },
        ...prev,
      ]);

      localStorage.setItem(
        'url',
        JSON.stringify([
          {
            original_url: shortenedUrl.data.url,
            shortened_url: `${url}${shortenedUrl.data.shortened_url}`,
            pathname: shortenedUrl.data.shortened_url,
          },
          ...localStorageData,
        ]),
      );
    } catch (error: any) {
      setError('url', { message: error.message });
    }
  };

  return {
    onSubmit,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    shortenedUrls,
  };
}
