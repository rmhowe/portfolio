import Link from 'next/link';
import Image from 'next/image';
import cn from 'classnames';
import { Project, Tag } from '../data/project-list';
import { containerMaxWidth } from '../utils/sizes';

const gradients = [
  'from-violet-500 via-fuchsia-500 to-pink-500',
  'from-pink-500 via-red-500 to-amber-500',
  'from-amber-500 via-lime-500 to-emerald-500',
  'from-emerald-500 via-purple-500 to-violet-500',
  'from-orange-500 via-green-500 to-teal-500',
];

const tagColors: Record<Tag, string> = {
  GPU: 'bg-cyan-600',
  Shaders: 'bg-fuchsia-600',
  VFX: 'bg-violet-600',
  Web: 'bg-emerald-600',
};

export const ProjectCard = ({
  title,
  description,
  image,
  linkTo,
  gradient,
  tags,
  logos,
}: Project & {
  gradient: number;
}) => {
  return (
    <Link
      href={`/projects/${linkTo}`}
      className={cn(
        'transform hover:scale-[1.01] transition-all w-full rounded-lg text-gray-100 hover:text-gray-100 bg-linear-to-r',
        gradients[gradient]
      )}
    >
      <div className="flex flex-col w-full h-full p-1">
        <div className="relative rounded-t-lg bg-gray-900 w-full flex-none">
          <Image
            src={image}
            alt={title}
            className="rounded-b-none object-cover h-full w-full"
            sizes={`(max-width: ${containerMaxWidth / 3}px) 100vw, ${containerMaxWidth / 3}px`}
          />
          <div className="flex gap-1.5 absolute bottom-1 right-1">
            {logos.map((logo) => (
              <img src={`/static/images/logos/${logo}.svg`} className="w-8" />
            ))}
          </div>
        </div>
        <div className="grow flex flex-col gap-2 bg-gray-900 rounded-b-lg p-4">
          <h4 className="w-full m-0 text-lg font-medium">{title}</h4>
          <p className="grow w-full m-0 mb-2">{description}</p>
          <div className="flex flex-wrap gap-1">
            {tags.map((tag) => (
              <div key={tag} className={`rounded-lg ${tagColors[tag]} px-1.5`}>
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};
