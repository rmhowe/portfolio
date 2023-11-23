import { NextPage } from 'next';
import { Galaxy } from '../../components/galaxy/Galaxy';
import { Shell } from '../../components/Shell';
import { BackLink } from '../../components/BackLink';

const ParticleGalaxy: NextPage = () => {
  return (
    <Shell>
      <div className="w-full max-w-2xl mx-auto">
        <BackLink />
        <h1 className="font-bold text-xl md:text-3xl tracking-tight mb-1 text-black dark:text-white">
          Particle Galaxy
        </h1>
        <p className="text-gray-700 dark:text-gray-200 mb-4">
          This is an experiment I built for fun mostly to get familiar with
          Three.js. It uses particles to simulate stars in a galaxy, click and
          drag to move the camera around.
        </p>
        <p className="text-gray-700 dark:text-gray-200 mb-10">
          Source code available{' '}
          <a
            className="text-blue-500"
            href="https://github.com/rmhowe/portfolio/blob/main/components/Galaxy.tsx"
            target="_blank"
          >
            here
          </a>
          .
        </p>
      </div>
      <div className="w-full" style={{ height: '75vh' }}>
        <Galaxy />
      </div>
    </Shell>
  );
};

export default ParticleGalaxy;
