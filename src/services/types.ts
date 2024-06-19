export type ShortenUrl = {
  error: boolean;
  message: string;
  data: {
    url: string;
    shortened_url: string;
    visits: number;
    created_at: number;
  };
};

export type GetRedirectUrl = {
  error: boolean;
  message: string;
  data?: {
    url: string;
  };
};

export type GetShortenUrlInfo = {
  error: boolean;
  message: string;
  data: {
    url: string;
    shortened_url: string;
    visits: number;
    created_at: number;
  };
};

export type GetShortenUrlInfoResponse = {
  error: boolean;
  message: string;
  data: {
    url: string;
    shortened_url: string;
    visits: number;
    created_at: string;
  };
};
