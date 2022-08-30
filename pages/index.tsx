import { NextPage } from 'next';

import { Shell } from '../components/Shell';
import { ProjectCard } from '../components/ProjectCard';
import { projectList } from './projects';
import Link from 'next/link';
import { ArrowRight } from 'phosphor-react';

const Home: NextPage = () => {
  return (
    <Shell>
      <div className="flex flex-col justify-center items-start max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pb-16">
        <div className="flex flex-col-reverse sm:flex-row items-start">
          <div className="flex flex-col pr-8">
            <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-1 text-black dark:text-white">
              Robbie Howe
            </h1>
            <h2 className="text-gray-700 dark:text-gray-200 mb-4">
              Front-End Developer, Game Developer
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-16">
              Software Developer with a passion for 3D and Front-End based in
              the South West of England. Available for contract work.
            </p>
          </div>
        </div>

        <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-6 text-black dark:text-white">
          Featured projects
        </h3>
        <div className="flex gap-6 flex-col w-full">
          {projectList
            .filter((project) => project.featured)
            .map(({ title, description, image, linkTo, gradient }) => (
              <ProjectCard
                title={title}
                description={description}
                image={image}
                linkTo={linkTo}
                gradient={gradient}
              />
            ))}
        </div>
        <Link href="/projects">
          <a className="flex items-center gap-1 mt-8 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-all">
            See all projects
            <ArrowRight size={20} />
          </a>
        </Link>
      </div>
    </Shell>
  );
};

export default Home;
