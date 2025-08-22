import { BackLink } from '../../../components/BackLink';
import { PageTitle } from '../../../components/PageTitle';
import { ExternalLink } from '../../../components/ExternalLink';
import { generateProjectMetadata } from '../../../utils/metadata';
import { FlowFieldNoSSR } from '@/app/components/flow-field';

export const metadata = generateProjectMetadata({
  title: 'Flow Field WebGL',
  description:
    'A GPGPU implementation of flow field particle movement in WebGL using Frame Buffer Objects and three.js.',
  slug: 'flow-field-webgl',
  tags: ['Shaders', 'Web', 'Three.js', 'TypeScript'],
});

export default function FlowFieldWebGLPage() {
  return (
    <>
      <BackLink />
      <PageTitle>Flow Field WebGL</PageTitle>
      <div className="text-gray-200">
        <p className="mb-4">
          This is a General Purpose GPU (GPGPU) implementation of a flow field
          particle animation using three.js and WebGL. Sadly WebGL has no native
          support for compute shaders so you need to use workarounds for GPGPU,
          the most direct method being frame buffer objects (FBOs). Thankfully
          three.js provides a WebGLRenderTarget class which acts as a
          convenience class for using frame buffer objects. On top of that it
          also provides a (undocumented) GPUComputationRenderer class which is
          very useful for abstracting away a lot of the oddities of performing
          GPGPU computations in WebGL such as setting up ping pong buffers for
          reading/writing FBO data.
        </p>
        <p className="mb-4">
          The effect itself is focused on moving particles using a flow field,
          to make them look as if they're almost being taken by the wind. I
          think the effect looks quite ethereal so I applied it to a very
          majestic looking husky model available from{' '}
          <a href="https://sketchfab.com/3d-models/realistic-dog-siberian-husky-3d-model-89dd036e227d42d0af3f13ddde9e7cc7">
            here
          </a>
          . The texture for the original model is being ignored and instead I've
          just applied random/rainbow colours to the particles in keeping with
          the etheral vibe.
        </p>
        <p className="mb-4">
          As you might be able to tell from the mentions of "WebGL" in the title
          and text, there are alternative methods for this! WebGPU is very
          nearly available on the latest release of all major browsers, and it
          includes native support for compute shaders so next up will be
          creating a similar effect in WebGPU.
        </p>
        <p className="mb-10">
          Source code available{' '}
          <ExternalLink href="https://github.com/rmhowe/portfolio/blob/main/components/flow-field/FlowField.tsx">
            here
          </ExternalLink>
          .
        </p>
      </div>
      <div className="w-full" style={{ height: '75vh' }}>
        <FlowFieldNoSSR />
      </div>
    </>
  );
}
