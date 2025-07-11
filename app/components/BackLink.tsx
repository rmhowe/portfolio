import { Url } from 'next/dist/shared/lib/router/router';
import Link from 'next/link';
import { ArrowLeftIcon } from '@phosphor-icons/react/ssr';

export const BackLink = ({ to }: { to?: Url }) => {
  return (
    <Link
      href={to ?? '/'}
      className="flex items-center gap-1 mt-8 text-gray-400 hover:text-gray-200 transition-all"
    >
      <ArrowLeftIcon /> Back
    </Link>
  );
};
