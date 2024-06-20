import Image from 'next/image';
import Link from 'next/link';

export default async function NotFound() {
  return (
    <section className="fixed left-0 top-0 flex h-screen w-full flex-col items-center justify-center">
      <Image
        src={'/not-found.svg'}
        alt="Imagem com error 404"
        width={500}
        height={500}
      />

      <Link
        href="/"
        className="rounded bg-gray-300 p-5 uppercase text-white duration-150 hover:bg-gray-400"
      >
        Voltar para o início
      </Link>
    </section>
  );
}
