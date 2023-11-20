import { NextPage } from 'next';
import { Shell } from '../../components/Shell';
import { CelShader } from '../../components/cel-shader/CelShader';
import { BackLink } from '../../components/BackLink';

const CelShaderPage: NextPage = () => {
  return (
    <Shell>
      <div className="w-full max-w-2xl mx-auto">
        <BackLink to={'/projects'} />
        <h1 className="font-bold text-xl md:text-3xl tracking-tight mb-1">
          Cel Shader
        </h1>
        <p className="text-gray-200 mb-4">
          This is a cel shader I used to prototype a similar shader that was
          going to be used in Unreal Engine.
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
