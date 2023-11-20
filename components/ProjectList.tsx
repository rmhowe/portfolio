import { Project } from '../pages/projects';
import { ProjectCard } from './ProjectCard';

export const ProjectList = ({ list }: { list: Project[] }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-6 items-start w-full text-left">
      {list.map(({ title, description, image, linkTo, gradient }) => (
        <ProjectCard
          title={title}
          description={description}
          image={image}
          linkTo={linkTo}
          gradient={gradient}
          key={linkTo}
        />
      ))}
    </div>
  );
};
