import { Shell } from '../components/Shell';
import { projectList } from '../data/project-list';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { ProjectList } from '../components/ProjectList';

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-start mx-auto mt-20 pb-16 text-center">
      <h1 className="w-full font-bold text-4xl tracking-tight mb-1">
        Robbie Howe
      </h1>
      <h3 className="w-full text-gray-300">
        Front End Developer
        <br />
        Graphics Programmer
      </h3>

      <div className="w-full flex justify-center gap-10 mt-10">
        <a
          href="https://github.com/rmhowe"
          target="_blank"
          rel="noopener noreferrer"
          className="text-rose-50 hover:text-gray-300 transition-all"
          title="GitHub"
        >
          <FontAwesomeIcon icon={faGithub} className="w-8" />
        </a>
        <a
          href="https://www.linkedin.com/in/robbie-howe-8ba50540/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-rose-50 hover:text-gray-300 transition-all"
          title="LinkedIn"
        >
          <FontAwesomeIcon icon={faLinkedinIn} className="w-8" />
        </a>
      </div>

      <h2 className="w-full font-bold text-3xl tracking-tight mt-12 mb-6">
        Projects
      </h2>
      <ProjectList list={projectList} />
    </div>
  );
}
