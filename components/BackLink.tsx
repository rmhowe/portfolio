import { Url } from 'next/dist/shared/lib/router/router';
import Link from 'next/link';
import { ArrowLeft } from '@phosphor-icons/react';

export const BackLink = ({ to }: { to?: Url }) => {
  return (
    <Link
      href={to ?? '/'}
      className="flex items-center gap-1 mt-8 text-gray-400 hover:text-gray-200 transition-all"
    >
      <ArrowLeft /> Back
    </Link>
  );
};
