import Link from 'next/link';
import { ExternalLink } from './ExternalLink';

export const Footer = () => {
  return (
    <footer className="flex flex-col justify-center items-start max-w-2xl mx-auto w-full px-8 sm:px-0">
      <hr className="w-full border border-gray-200 dark:border-gray-800 mb-8" />
      <div className="w-full max-w-2xl grid grid-cols-1 gap-4 pb-16 sm:grid-cols-3">
        <div className="flex flex-col space-y-4">
          <Link href="/">
            <a className="text-gray-500 hover:text-gray-600 transition">Home</a>
          </Link>
          <Link href="/cv">
            <a className="text-gray-500 hover:text-gray-600 transition">CV</a>
          </Link>
          <ExternalLink
            href="https://github.com/rmhowe"
            className="text-gray-500 hover:text-gray-600"
          >
            GitHub
          </ExternalLink>
        </div>
      </div>
    </footer>
  );
};
