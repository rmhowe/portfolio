import { BackLink } from '../../../components/BackLink';
import { PageTitle } from '../../../components/PageTitle';
import { ExternalLink } from '../../../components/ExternalLink';
import { VoxelRenderer } from '../../../components/voxel-renderer/VoxelRenderer';

export default function VoxelRendererPage() {
  return (
    <>
      <BackLink />
      <PageTitle>Voxel Renderer</PageTitle>
      <div className="text-gray-200">
        <p className="mb-4">
          This was preparatory work completed ahead of a project that needed to
          simultaneously render millions of voxels. Rendering millions of cubes
          is of course too slow, and instancing helped but only up to several
          tens of thousands.
        </p>
        <p className="mb-4">
          Instead, custom geometry was created which was grouped by voxel type,
          eliminating all internal faces. Voxel types were to be represented by
          simple colors so vertex colors were added depending on the voxel type.
        </p>
        <p className="mb-10">
          Source code available{' '}
          <ExternalLink href="https://github.com/rmhowe/portfolio/blob/main/components/voxel-renderer/VoxelRenderer.tsx">
            here
          </ExternalLink>
          .
        </p>
      </div>
      <div className="w-full" style={{ height: '75vh' }}>
        <VoxelRenderer />
      </div>
    </>
  );
}
