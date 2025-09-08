import { StaticImageData } from 'next/image';
import BubbleShieldThumb from '../assets/images/bubble-shield-thumbnail.png';
import CelShaderThumb from '../assets/images/cel-shader-thumbnail.png';
import CharacterTrailThumb from '../assets/images/character-trail-thumbnail.png';
import GameOfLifeThumb from '../assets/images/webgpu-game-of-life-thumbnail.png';
import VoxelThumb from '../assets/images/voxel-renderer-thumbnail.png';
import FlowFieldWebGLThumb from '../assets/images/flow-field-webgl-thumbnail.png';

export type Tag = 'GPU' | 'Shaders' | 'VFX' | 'Web';

export type Logo =
  | 'houdini'
  | 'substance-designer'
  | 'threejs'
  | 'typescript'
  | 'unreal'
  | 'webgpu';

export type Project = {
  title: string;
  description: string;
  image: StaticImageData;
  linkTo: string;
  tags: Tag[];
  logos: Logo[];
};

export const projectList: Project[] = [
  {
    title: 'Flow Field WebGL',
    description:
      'A GPGPU implementation of flow field particle movement in WebGL.',
    image: FlowFieldWebGLThumb,
    linkTo: 'flow-field-webgl',
    tags: ['Shaders', 'Web'],
    logos: ['threejs', 'typescript'],
  },
  {
    title: 'Voxel Renderer',
    description: 'An efficient renderer for large numbers of voxels.',
    image: VoxelThumb,
    linkTo: 'voxel-renderer',
    tags: ['Shaders', 'Web'],
    logos: ['threejs', 'typescript'],
  },
  {
    title: 'Cel Shader',
    description:
      'A cel shader in Three.js used for rapid prototyping and iteration.',
    image: CelShaderThumb,
    linkTo: 'cel-shader',
    tags: ['Shaders', 'Web'],
    logos: ['threejs', 'typescript'],
  },
  {
    title: 'Procedural Bubble Shield',
    description: 'A procedurally created sci-fi inspired bubble shield VFX.',
    image: BubbleShieldThumb,
    linkTo: 'bubble-shield',
    tags: ['Shaders', 'VFX'],
    logos: ['houdini', 'substance-designer', 'unreal'],
  },
  {
    title: 'Character Trail',
    description:
      'A character trail effect inspired by the Sandevistan in Cyberpunk Edgerunners.',
    image: CharacterTrailThumb,
    linkTo: 'character-trail',
    tags: ['Shaders', 'VFX'],
    logos: ['unreal'],
  },
];
