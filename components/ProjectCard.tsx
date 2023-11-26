import Link from 'next/link';
import cn from 'classnames';
import { Project, Tag } from '../data/project-list';

const gradients = [
  'from-indigo-500 via-purple-500 to-pink-500',
  'from-[#a8ff78] to-[#78ffd6]',
  'from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]',
  'from-[#a8ff78] to-[#78ffd6]',
];

const tagColors: Record<Tag, string> = {
  Materials: 'bg-emerald-600',
  Procedural: 'bg-emerald-600',
  Shaders: 'bg-teal-600',
  'Three.js': 'bg-cyan-600',
  TypeScript: 'bg-sky-600',
  Unity: 'bg-blue-600',
  Unreal: 'bg-fuchsia-600',
  VFX: 'bg-violet-600',
};

export const ProjectCard = ({
  title,
  description,
  image,
  linkTo,
  gradient,
  tags,
}: Project & {
  gradient: number;
}) => {
  return (
    <Link
      href={`/projects/${linkTo}`}
      className={cn(
        'transform hover:scale-[1.01] transition-all w-full rounded-lg text-gray-100 hover:text-gray-100 bg-gradient-to-r',
        gradients[gradient]
      )}
    >
      <div className="flex flex-col w-full h-full p-1">
        <div className="rounded-t-lg bg-gray-900 w-full flex-none">
          <img src={image} className="rounded-b-none object-cover h-full" />
        </div>
        <div className="grow flex flex-col gap-2 bg-gray-900 rounded-b-lg p-4">
          <h4 className="w-full m-0 text-lg font-medium">{title}</h4>
          <p className="grow w-full m-0 mb-2">{description}</p>
          <div className="flex flex-wrap gap-1">
            {tags.map((tag) => (
              <div className={`rounded-lg ${tagColors[tag]} px-1.5`}>{tag}</div>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};
