import { BackLink } from '../../../components/BackLink';
import { PageTitle } from '../../../components/PageTitle';
import { GameOfLife } from '../../../components/webgpu-game-of-life/GameOfLife';
import { ExternalLink } from '../../../components/ExternalLink';

export default function WebGPUGameOfLifePage() {
  return (
    <>
      <BackLink />
      <PageTitle>WebGPU Game of Life</PageTitle>
      <div>
        <p className="mb-4">
          This is a WebGPU implementation of{' '}
          <ExternalLink href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">
            Conway's Game of Life
          </ExternalLink>
          , using compute shaders to run the simulation on your GPU and a GPU
          render pipeline to render the output. I used{' '}
          <ExternalLink href="https://codelabs.developers.google.com/your-first-webgpu-app#0">
            this article
          </ExternalLink>{' '}
          as a starting point and modified it to work in a React-based
          environment.
        </p>
        <p className="mb-10">
          The source code is available{' '}
          <ExternalLink href="https://github.com/rmhowe/portfolio/blob/main/components/webgpu-game-of-life/GameOfLife.tsx">
            here
          </ExternalLink>
          , and if your browser and device support WebGPU it there'll be a live
          version below.
        </p>
      </div>
      <div className="w-full">
        <GameOfLife />
      </div>
    </>
  );
}
