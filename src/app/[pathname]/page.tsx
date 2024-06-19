import { getRedirectUrl } from '@/services/shortener';
import { notFound, redirect } from 'next/navigation';

export default async function Redirect({
  params,
}: {
  params: { pathname: string };
}) {
  const url = await getRedirectUrl(params.pathname);

  if (url.data?.url) {
    redirect(url.data.url);
  }

  notFound();
}
