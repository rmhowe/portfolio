import * as THREE from 'three';

export enum VoxelType {
  Empty = 0,
  Occupied = 1,
  Hazard = 2,
}

const voxelColors: Record<VoxelType, [number, number, number, number]> = {
  [VoxelType.Empty]: [0, 0, 0, 0],
  [VoxelType.Occupied]: [0.5, 0.5, 0.5, 0.5],
  [VoxelType.Hazard]: [1, 0.2, 0, 0.9],
};

export class VoxelGrid {
  private chunks: Record<string, Uint8Array>;
  private chunkSliceSize: number;

  constructor(private chunkSize: number) {
    this.chunks = {};
    this.chunkSliceSize = chunkSize * chunkSize;
  }

  getChunkId(x: number, y: number, z: number) {
    const chunkX = Math.floor(x / this.chunkSize);
    const chunkY = Math.floor(y / this.chunkSize);
    const chunkZ = Math.floor(z / this.chunkSize);
    return `${chunkX},${chunkY},${chunkZ}`;
  }

  getChunkForVoxel(x: number, y: number, z: number) {
    return this.chunks[this.getChunkId(x, y, z)];
  }

  computeVoxelOffset(x: number, y: number, z: number) {
    const voxelX = THREE.MathUtils.euclideanModulo(x, this.chunkSize);
    const voxelY = THREE.MathUtils.euclideanModulo(y, this.chunkSize);
    const voxelZ = THREE.MathUtils.euclideanModulo(z, this.chunkSize);
    return voxelY * this.chunkSliceSize + voxelZ * this.chunkSize + voxelX;
  }

  getVoxel(x: number, y: number, z: number) {
    const chunk = this.getChunkForVoxel(x, y, z);
    if (!chunk) {
      return VoxelType.Empty;
    }
    const voxelOffset = this.computeVoxelOffset(x, y, z);
    return chunk[voxelOffset] as VoxelType;
  }

  setVoxel(x: number, y: number, z: number, v: VoxelType) {
    let chunk = this.getChunkForVoxel(x, y, z);
    if (!chunk) {
      chunk = this.addChunkForVoxel(x, y, z);
    }
    const voxelOffset = this.computeVoxelOffset(x, y, z);
    chunk[voxelOffset] = v;
  }

  addChunkForVoxel(x: number, y: number, z: number) {
    const chunkId = this.getChunkId(x, y, z);
    let chunk = this.chunks[chunkId];
    if (!chunk) {
      const { chunkSize } = this;
      chunk = new Uint8Array(chunkSize * chunkSize * chunkSize);
      this.chunks[chunkId] = chunk;
    }
    return chunk;
  }

  generateGeometryDataForChunk(chunkX: number, chunkY: number, chunkZ: number) {
    const positions = [];
    const normals = [];
    const colors = [];
    const indices = [];
    const startX = chunkX * this.chunkSize;
    const startY = chunkY * this.chunkSize;
    const startZ = chunkZ * this.chunkSize;

    for (let y = 0; y < this.chunkSize; y++) {
      const voxelY = startY + y;
      for (let z = 0; z < this.chunkSize; z++) {
        const voxelZ = startZ + z;
        for (let x = 0; x < this.chunkSize; x++) {
          const voxelX = startX + x;
          const voxel = this.getVoxel(voxelX, voxelY, voxelZ);
          if (voxel === VoxelType.Empty) {
            continue;
          }

          for (const { direction, corners } of faces) {
            const neighbor = this.getVoxel(
              voxelX + direction[0],
              voxelY + direction[1],
              voxelZ + direction[2]
            );
            if (neighbor !== voxel) {
              const index = positions.length / 3;
              for (const position of corners) {
                positions.push(
                  position[0] + x,
                  position[1] + y,
                  position[2] + z
                );
                normals.push(...direction);
                colors.push(...voxelColors[voxel]);
              }
              indices.push(
                index,
                index + 1,
                index + 2,
                index + 2,
                index + 1,
                index + 3
              );
            }
          }
        }
      }
    }

    return {
      positions,
      normals,
      colors,
      indices,
    };
  }
}

const faces = [
  {
    // left
    direction: [-1, 0, 0],
    corners: [
      [0, 1, 0],
      [0, 0, 0],
      [0, 1, 1],
      [0, 0, 1],
    ],
  },
  {
    // right
    direction: [1, 0, 0],
    corners: [
      [1, 1, 1],
      [1, 0, 1],
      [1, 1, 0],
      [1, 0, 0],
    ],
  },
  {
    // bottom
    direction: [0, -1, 0],
    corners: [
      [1, 0, 1],
      [0, 0, 1],
      [1, 0, 0],
      [0, 0, 0],
    ],
  },
  {
    // top
    direction: [0, 1, 0],
    corners: [
      [0, 1, 1],
      [1, 1, 1],
      [0, 1, 0],
      [1, 1, 0],
    ],
  },
  {
    // back
    direction: [0, 0, -1],
    corners: [
      [1, 0, 0],
      [0, 0, 0],
      [1, 1, 0],
      [0, 1, 0],
    ],
  },
  {
    // front
    direction: [0, 0, 1],
    corners: [
      [0, 0, 1],
      [1, 0, 1],
      [0, 1, 1],
      [1, 1, 1],
    ],
  },
];
