'use client';

import { Loader } from 'lucide-react';
import Link from 'next/link';
import { useInfos } from './useInfos';

export default function Infos() {
  const { onSubmit, register, handleSubmit, errors, isSubmitting, data } =
    useInfos();

  return (
    <>
      <section>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3 p-1"
        >
          <input
            type="text"
            placeholder="fh5ab"
            {...register('pathname')}
            className="border-b p-1 focus:border-b-black focus:outline-none"
          />

          <p className="pl-1 text-xs text-red-500">
            {errors.pathname?.message}
          </p>

          <div className="flex items-center justify-end gap-5">
            <Link href="/" className="hover:underline">
              Encurtar
            </Link>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-fit items-center gap-1 rounded bg-gray-300 p-1 text-white duration-150 hover:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-300"
            >
              Informações
              {isSubmitting && <Loader className="animate-spin" size={16} />}
            </button>
          </div>
        </form>
      </section>

      <section className="space-y-3">
        {data && (
          <>
            <h2 className="font-semibold">Informações da URL</h2>

            <article className="flex flex-col items-start justify-between rounded bg-gray-100 p-3">
              <p className="w-full truncate text-sm">
                <strong>URL Original: </strong>
                <Link
                  href={data.url}
                  title={data.url}
                  target="_blank"
                  className="hover:underline"
                >
                  {data.url}
                </Link>
              </p>

              <p className="w-full truncate text-sm">
                <strong>URL Encurtada: </strong>
                <Link
                  href={data.shortened_url}
                  title={data.shortened_url}
                  target="_blank"
                  className="hover:underline"
                >
                  {`${window.location.origin}/${data.shortened_url}`}
                </Link>
              </p>

              <p className="w-full truncate text-sm">
                <strong>Visitas: </strong>
                {data.visits}
              </p>

              <p className="w-full truncate text-sm">
                <strong>Criado em: </strong>
                {data.created_at}
              </p>
            </article>
          </>
        )}
      </section>
    </>
  );
}
