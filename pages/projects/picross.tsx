import { NextPage } from 'next';
import { Shell } from '../../components/Shell';
import { Picross } from '../../components/picross';

const PicrossPage: NextPage = () => {
  return (
    <Shell>
      <div className="w-full max-w-2xl mx-auto">
        <h1 className="font-bold text-xl md:text-3xl tracking-tight mb-1 text-black dark:text-white">
          Picross
        </h1>
        <p className="text-gray-700 dark:text-gray-200 mb-4">
          This is a game I built for fun in ReactJS and TailwindCSS. It's a{' '}
          <a
            className="text-blue-500"
            href="https://en.wikipedia.org/wiki/Nonogram"
            target="_blank"
          >
            nonogram
          </a>{' '}
          solver, the wikipedia page has a great brief explanation of the rules
          if you're unfamiliar with the style of game. Give it a try below!
        </p>
        <p className="text-gray-700 dark:text-gray-200 mb-10">
          Source code available{' '}
          <a
            className="text-blue-500"
            href="https://github.com/rmhowe/portfolio/blob/main/components/picross"
            target="_blank"
          >
            here
          </a>
          .
        </p>
        <Picross />
      </div>
    </Shell>
  );
};

export default PicrossPage;
