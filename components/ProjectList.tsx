import { Project } from '../data/project-list';
import { ProjectCard } from './ProjectCard';

export const ProjectList = ({ list }: { list: Project[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-start w-full text-left">
      {list.map(({ title, description, image, linkTo }, index) => (
        <ProjectCard
          title={title}
          description={description}
          image={image}
          linkTo={linkTo}
          gradient={index}
        />
      ))}
    </div>
  );
};
