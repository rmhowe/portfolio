import { Project } from '../data/project-list';
import { ProjectCard } from './ProjectCard';

export const ProjectList = ({ list }: { list: Project[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full text-left">
      {list.map((project, index) => (
        <ProjectCard {...project} gradient={index} />
      ))}
    </div>
  );
};
