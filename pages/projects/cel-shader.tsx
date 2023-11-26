import { NextPage } from 'next';
import { Shell } from '../../components/Shell';
import { CelShader } from '../../components/cel-shader/CelShader';
import { BackLink } from '../../components/BackLink';
import { PageTitle } from '../../components/PageTitle';

const CelShaderPage: NextPage = () => {
  return (
    <Shell>
      <BackLink />
      <PageTitle>Cel Shader</PageTitle>
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
          <a
            className="text-blue-500"
            href="https://github.com/rmhowe/portfolio/blob/main/components/CelShader.tsx"
            target="_blank"
          >
            here
          </a>
          .
        </p>
      </div>
      <div className="w-full" style={{ height: '75vh' }}>
        <CelShader />
      </div>
    </Shell>
  );
};

export default CelShaderPage;
