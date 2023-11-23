import { NextPage } from 'next';
import { Shell } from '../../components/Shell';
import { CelShader } from '../../components/cel-shader/CelShader';
import { BackLink } from '../../components/BackLink';

const CelShaderPage: NextPage = () => {
  return (
    <Shell>
      <div className="w-full max-w-2xl mx-auto">
        <BackLink />
        <h1 className="font-bold text-xl md:text-3xl tracking-tight mb-1">
          Cel Shader
        </h1>
        <p className="text-gray-200 mb-4">
          This is a cel shader that will ultimately be used in a source build of
          Unreal Engine. I've used Three.js here for prototyping as the
          iteration speeds are much faster, while still providing a comparable
          (at least at a basic technical level) rendering environment.
        </p>
        <p className="text-gray-200 mb-10">
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
