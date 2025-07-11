import { Galaxy } from '../../../components/galaxy/Galaxy';
import { BackLink } from '../../../components/BackLink';
import { PageTitle } from '../../../components/PageTitle';
import { generateProjectMetadata } from '../../../utils/metadata';

export const metadata = generateProjectMetadata({
  title: 'Particle Galaxy',
  description: 'An interactive 3D particle system simulating galaxy formation using Three.js and WebGL.',
  image: '/static/images/particle-galaxy-thumbnail.png',
  slug: 'particle-galaxy',
  tags: ['Shaders', 'Web', 'Three.js', 'TypeScript'],
});

export default function ParticleGalaxyPage() {
  return (
    <>
      <BackLink />
      <PageTitle>Particle Galaxy</PageTitle>
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
      <div className="w-full" style={{ height: '75vh' }}>
        <Galaxy />
      </div>
    </>
  );
}
