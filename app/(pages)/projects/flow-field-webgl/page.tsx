import { BackLink } from '../../../components/BackLink';
import { PageTitle } from '../../../components/PageTitle';
import { ExternalLink } from '../../../components/ExternalLink';
import { generateProjectMetadata } from '../../../utils/metadata';
import dynamic from 'next/dynamic';

const FlowField = dynamic(
  () => import('../../../components/flow-field/FlowField'),
  { ssr: false }
);

export const metadata = generateProjectMetadata({
  title: 'Flow Field WebGL',
  description:
    'A GPGPU implementation of flow field particle movement in WebGL using Frame Buffer Objects and Three.js.',
  slug: 'flow-field-webgl',
  tags: ['Shaders', 'Web', 'Three.js', 'TypeScript'],
});

export default function FlowFieldWebGLPage() {
  return (
    <>
      <BackLink />
      <PageTitle>Flow Field WebGL</PageTitle>
      <div className="text-gray-200">
        <p className="mb-4">Flow field!</p>
        <p className="mb-10">
          Source code available{' '}
          <ExternalLink href="https://github.com/rmhowe/portfolio/blob/main/components/flow-field/FlowField.tsx">
            here
          </ExternalLink>
          .
        </p>
      </div>
      <div className="w-full" style={{ height: '75vh' }}>
        <FlowField />
      </div>
    </>
  );
}
