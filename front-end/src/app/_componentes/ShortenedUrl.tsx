import Link from 'next/link';
import { ShortenedUrlProps } from './types';

export function ShortenedUrl({
  shortened_url,
  original_url,
}: ShortenedUrlProps) {
  return (
    <article
      key={shortened_url}
      className="flex flex-col items-start justify-between rounded bg-gray-100 p-3"
    >
      <p className="w-full truncate text-sm">
        <strong>URL Original: </strong>
        <Link
          href={original_url}
          title={original_url}
          target="_blank"
          className="hover:underline"
        >
          {original_url}
        </Link>
      </p>
      <p className="w-full truncate text-sm">
        <strong>URL Encurtada: </strong>
        <Link
          href={shortened_url}
          title={shortened_url}
          target="_blank"
          className="hover:underline"
        >
          {shortened_url}
        </Link>
      </p>
    </article>
  );
}
