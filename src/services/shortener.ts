import {
  GetRedirectUrl,
  GetShortenUrlInfo,
  GetShortenUrlInfoResponse,
  ShortenUrl,
} from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const shortenUrl = async (url: string): Promise<ShortenUrl> => {
  const response = await fetch(`${API_BASE_URL}/shortener`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url: url }),
  });

  if (!response.ok) {
    throw await response.json();
  }

  const data: ShortenUrl = await response.json();

  return data;
};

export const getRedirectUrl = async (
  pathname: string,
): Promise<GetRedirectUrl> => {
  const response = await fetch(`${API_BASE_URL}/shortener/${pathname}`, {
    method: 'GET',
    cache: 'no-store',
  });

  const data: GetRedirectUrl = await response.json();

  return data;
};

export const getShortenUrlInfo = async (
  pathname: string,
): Promise<GetShortenUrlInfoResponse> => {
  const response = await fetch(
    `${API_BASE_URL}/shortener/details/${pathname}`,
    {
      method: 'GET',
    },
  );

  if (!response.ok) {
    throw await response.json();
  }

  const data: GetShortenUrlInfo = await response.json();

  const created_at = new Date(data.data.created_at);
  const formattedDate = created_at.toLocaleDateString('pt-BR');

  const newData = {
    ...data,
    data: {
      ...data.data,
      created_at: formattedDate,
    },
  };

  return { ...newData };
};
