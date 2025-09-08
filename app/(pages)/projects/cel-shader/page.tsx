import { CelShader } from '../../../components/cel-shader/CelShader';
import { BackLink } from '../../../components/BackLink';
import { PageTitle } from '../../../components/PageTitle';
import { ExternalLink } from '../../../components/ExternalLink';
import { generateProjectMetadata } from '../../../utils/metadata';

export const metadata = generateProjectMetadata({
  title: 'Cel Shader',
  description:
    'A cel shader in Three.js used for rapid prototyping and iteration of toon-style rendering effects.',
  image: '/static/images/cel-shader-thumbnail.png',
  slug: 'cel-shader',
  tags: ['Shaders', 'Web', 'Three.js', 'TypeScript'],
});

export default function CelShaderPage() {
  return (
    <>
      <BackLink />
      <PageTitle>Cel Shader</PageTitle>
      <div className="w-full" style={{ height: '60vh' }}>
        <CelShader />
      </div>
      <div className="text-gray-200">
        <p className="mb-4">
          This is a cel shader that will ultimately be used in a source build of
          Unreal Engine. I've used Three.js here for prototyping as the
          iteration speeds are much faster, while still providing a comparable
          (at least at a basic technical level) rendering environment.
        </p>
        <p className="mb-4">
          The example below shows a comparison between the cel shader I created
          and the MeshToonMaterial included with Three.js. You can see a greater
          level of control with specular highlights as well as different banding
          depending on the light source.
        </p>
        <p className="mb-10">
          Source code available{' '}
          <ExternalLink href="https://github.com/rmhowe/portfolio/blob/main/components/cel-shader/CelShader.tsx">
            here
          </ExternalLink>
          .
        </p>
      </div>
    </>
  );
}
