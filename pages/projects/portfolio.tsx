import { NextPage } from 'next';
import { Shell } from '../../components/Shell';

const Portfolio: NextPage = () => {
  return (
    <Shell>
      <div className="w-full max-w-2xl mx-auto">
        <h1 className="font-bold text-xl md:text-3xl tracking-tight mb-1 text-black dark:text-white">
          Portfolio
        </h1>
        <p className="text-gray-700 dark:text-gray-200 mb-4">
          I built this minimal portfolio to showcase any projects I build for
          clients or in my spare time. It was built using NextJS and
          TailwindCSS, and deployed on Cloudflare Pages. Have a look around!
        </p>
        <p className="text-gray-700 dark:text-gray-200 mb-10">
          Source code available{' '}
          <a
            className="text-blue-500"
            href="https://github.com/rmhowe/portfolio"
            target="_blank"
          >
            here
          </a>
          .
        </p>
      </div>
    </Shell>
  );
};

export default Portfolio;
