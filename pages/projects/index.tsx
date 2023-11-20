import { NextPage } from 'next';

import { Shell } from '../../components/Shell';
import { ProjectList } from '../../components/ProjectList';
import { BackLink } from '../../components/BackLink';

export const projectList = [
  {
    title: 'Cel Shader',
    description:
      'A cel shader in Three.js used for rapid prototyping and iteration',
    image: '/static/images/cel-shader-thumbnail.png',
    linkTo: 'cel-shader',
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
    title: 'Picross',
    description: 'A nonogram puzzle game made using React and Tailwind',
    image: '/static/images/picross-thumbnail.png',
    linkTo: 'picross',
    gradient: 'from-[#a8ff78] to-[#78ffd6]',
    featured: true,
  },
];
export type Project = (typeof projectList)[0];

const Home: NextPage = () => {
  return (
    <Shell>
      <div className="flex flex-col max-w-2xl border-gray-700 mx-auto pb-16 w-full">
        <BackLink to={'/'} />
        <h1 className="font-bold text-2xl md:text-4xl tracking-tight my-6">
          Projects
        </h1>
        <ProjectList list={projectList} />
      </div>
    </Shell>
  );
};

export default Home;
