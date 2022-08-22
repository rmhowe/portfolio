import Link from 'next/link';
import cn from 'classnames';

export const ProjectCard = ({
  title,
  description,
  name,
  gradient,
}: {
  title: string;
  description: string;
  name: string;
  gradient: string;
}) => {
  return (
    <Link href={`/projects/${name}`}>
      <a
        className={cn(
          'transform hover:scale-[1.01] transition-all w-full rounded-lg bg-gradient-to-r',
          gradient
        )}
      >
        <div className="flex flex-row w-full">
          <div className="grow bg-white dark:bg-gray-900 rounded-l-lg p-4 m-1 mr-0">
            <h4 className="w-full mb-2 text-lg font-medium text-gray-900 dark:text-gray-100">
              {title}
            </h4>
            <p className="text-md w-full text-gray-900 dark:text-gray-100">
              {description}
            </p>
          </div>
          <img src="http://placekitten.com/150/150" className="rounded-r-lg" />
        </div>
      </a>
    </Link>
  );
};
