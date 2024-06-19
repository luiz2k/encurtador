'use client';

import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  if (pathname === '/') {
    return (
      <header className="mb-10">
        <h1 className="text-center text-3xl font-bold">Encurtar URL</h1>
      </header>
    );
  }

  if (pathname === '/informacoes') {
    return (
      <header className="mb-10">
        <h1 className="text-center text-3xl font-bold">Obter Informações</h1>
      </header>
    );
  }
}
