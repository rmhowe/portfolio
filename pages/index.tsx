import { NextPage } from 'next';

import { Shell } from '../components/Shell';
import { projectList } from './projects';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGithub,
  faLinkedinIn,
  faArtstation,
} from '@fortawesome/free-brands-svg-icons';
import { ProjectList } from '../components/ProjectList';
import { ArrowRight } from 'phosphor-react';

const Home: NextPage = () => {
  return (
    <Shell>
      <div className="flex flex-col justify-center items-start max-w-2xl border-gray-700 mx-auto mt-10 pb-16 text-center">
        <h1 className="w-full font-bold text-4xl tracking-tight mb-1">
          Robbie Howe
        </h1>
        <h2 className="w-full text-2xl mb-4">Technical/VFX Artist</h2>

        <h3 className="w-full font-semibold text-3xl tracking-tight mt-10 mb-4">
          Links
        </h3>
        <div className="w-full flex justify-center gap-10">
          <a
            href="https://www.artstation.com/robbiehowe9"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-400 transition-all"
            title="ArtStation"
          >
            <FontAwesomeIcon icon={faArtstation} className="w-8" />
          </a>
          <a
            href="https://github.com/rmhowe"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-400 transition-all"
            title="GitHub"
          >
            <FontAwesomeIcon icon={faGithub} className="w-8" />
          </a>
          <a
            href="https://www.linkedin.com/in/robbie-howe-8ba50540/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-all"
            title="LinkedIn"
          >
            <FontAwesomeIcon icon={faLinkedinIn} className="w-8" />
          </a>
        </div>

        <h3 className="w-full font-semibold text-3xl tracking-tight mt-12 mb-4">
          Projects
        </h3>
        <ProjectList list={projectList.filter((project) => project.featured)} />
        <Link
          href="/projects"
          className="flex items-center gap-1 mt-8 text-gray-400 hover:text-gray-200 transition-all"
        >
          See all projects <ArrowRight />
        </Link>
      </div>
    </Shell>
  );
};

export default Home;
