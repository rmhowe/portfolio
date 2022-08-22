import { NextPage } from 'next';

import Link from 'next/link';

import { Shell } from '../components/Shell';
import { ProjectCard } from '../components/ProjectCard';
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
          Projects
        </h3>
        <div className="flex gap-6 flex-col w-full">
          <ProjectCard
            title="Particle Galaxy"
            description="A 3D galaxy animation made using ThreeJS particles"
            name="particle-galaxy"
            gradient="from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]"
          />
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
