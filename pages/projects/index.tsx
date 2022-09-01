import { NextPage } from 'next';

import { Shell } from '../../components/Shell';
import { ProjectCard } from '../../components/ProjectCard';

export const projectList = [
  {
    title: 'Picross',
    description: 'A nonogram puzzle game made using React and Tailwind',
    image: '/static/images/picross-thumbnail.png',
    linkTo: 'picross',
    gradient: 'from-[#a8ff78] to-[#78ffd6]',
    featured: true,
  },
  {
    title: 'Particle Galaxy',
    description: 'A 3D galaxy animation made using ThreeJS particles',
    image: '/static/images/particle-galaxy-thumbnail.png',
    linkTo: 'particle-galaxy',
    gradient: 'from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]',
    featured: true,
  },
  {
    title: 'Portfolio',
    description:
      "A simple and minimal showcase of projects I've worked on, built using NextJS and Tailwind, deployed on Cloudflare Pages",
    image: '/static/images/portfolio-thumbnail.png',
    linkTo: 'portfolio',
    gradient: 'from-[#FDE68A] via-[#FCA5A5] to-[#FA709A]',
    featured: true,
  },
];

const Home: NextPage = () => {
  return (
    <Shell>
      <div className="flex flex-col max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pb-16 w-full">
        <h1 className="font-bold text-2xl md:text-4xl tracking-tight mb-6 text-black dark:text-white">
          Projects
        </h1>
        <div className="flex gap-6 flex-col w-full">
          {projectList.map(
            ({ title, description, image, linkTo, gradient }) => (
              <ProjectCard
                title={title}
                description={description}
                image={image}
                linkTo={linkTo}
                gradient={gradient}
              />
            )
          )}
        </div>
      </div>
    </Shell>
  );
};

export default Home;
