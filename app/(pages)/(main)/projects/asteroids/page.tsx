import { BackLink } from '../../../../components/BackLink';
import { PageTitle } from '../../../../components/PageTitle';
import { ExternalLink } from '../../../../components/ExternalLink';
import { generateProjectMetadata } from '../../../../utils/metadata';
import { Asteroids } from '@/app/components/asteroids/Asteroids';

export const metadata = generateProjectMetadata({
  title: 'Asteroids',
  description: 'Asterooiiiiids',
  image: '/static/images/cel-shader-thumbnail.png',
  slug: 'asteroids',
  tags: ['Shaders', 'Web', 'Three.js', 'TypeScript'],
});

export default function AsteroidsPage() {
  return (
    <>
      <BackLink />
      <PageTitle>Asteroids</PageTitle>
      <div className="w-full" style={{ height: '60vh' }}>
        <Asteroids />
      </div>
      <div className="text-gray-200">
        <p className="mb-10">
          Source code available{' '}
          <ExternalLink href="https://github.com/rmhowe/portfolio/blob/main/components/asteroids/Asteroids.tsx">
            here
          </ExternalLink>
          .
        </p>
      </div>
    </>
  );
}
