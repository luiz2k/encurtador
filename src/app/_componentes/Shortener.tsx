'use client';

import { Loader } from 'lucide-react';
import Link from 'next/link';
import { useShortener } from './useShortener';

export default function Shortener() {
  const {
    onSubmit,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    shortenedUrls,
  } = useShortener();

  return (
    <>
      <section>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3 p-1"
        >
          <input
            type="text"
            placeholder="https://exemplo.com"
            {...register('url')}
            className="border-b p-1 focus:border-b-black focus:outline-none"
          />

          <p className="pl-1 text-xs text-red-500">{errors.url?.message}</p>

          <div className="flex items-center justify-end gap-5">
            <Link href="/informacoes" className="hover:underline">
              Informações
            </Link>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-fit items-center gap-1 rounded bg-gray-300 p-1 text-white duration-150 hover:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-300"
            >
              Encurtar
              {isSubmitting && <Loader className="animate-spin" size={16} />}
            </button>
          </div>
        </form>
      </section>

      <section className="space-y-3">
        <h2 className="font-semibold">URLs Encurtadas</h2>

        <div className="space-y-3">
          {shortenedUrls.map((item) => (
            <article
              key={item.shortened_url}
              className="flex flex-col items-start justify-between rounded bg-gray-100 p-3"
            >
              <p className="w-full truncate text-sm">
                <strong>URL Original: </strong>
                <Link
                  href={item.original_url}
                  title={item.original_url}
                  target="_blank"
                  className="hover:underline"
                >
                  {item.original_url}
                </Link>
              </p>
              <p className="w-full truncate text-sm">
                <strong>URL Encurtada: </strong>
                <Link
                  href={item.shortened_url}
                  title={item.shortened_url}
                  target="_blank"
                  className="hover:underline"
                >
                  {item.shortened_url}
                </Link>
              </p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
