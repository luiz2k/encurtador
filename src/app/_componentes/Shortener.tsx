'use client';

import { Loader } from 'lucide-react';
import Link from 'next/link';
import { useShortener } from './useShortener';
import { ShortenedUrl } from './ShortenedUrl';

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
          {shortenedUrls.length ? (
            <>
              {shortenedUrls.map((item) => (
                <ShortenedUrl
                  key={item.pathname}
                  original_url={item.original_url}
                  shortened_url={item.shortened_url}
                />
              ))}
            </>
          ) : (
            <>
              <p className="text-sm">Nenhuma URL encurtada</p>
            </>
          )}
        </div>
      </section>
    </>
  );
}
