import Link from 'next/link';
import cn from 'classnames';

export const ProjectCard = ({
  title,
  description,
  image,
  linkTo,
  gradient,
}: {
  title: string;
  description: string;
  image: string;
  linkTo: string;
  gradient: string;
}) => {
  return (
    <Link
      href={`/projects/${linkTo}`}
      className={cn(
        'block transform hover:scale-[1.01] transition-all w-full rounded-lg bg-gradient-to-r',
        gradient
      )}
    >
      <div className="flex flex-col w-full p-1">
        <div className="rounded-t-lg bg-gray-900 w-full flex-none">
          <img src={image} className="rounded-t-lg object-cover h-full" />
        </div>
        <div className="grow bg-gray-900 rounded-b-lg p-4">
          <h4 className="w-full mb-2 text-lg font-medium text-gray-900 dark:text-gray-100">
            {title}
          </h4>
          <p className="text-md w-full text-gray-900 dark:text-gray-100">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
};
