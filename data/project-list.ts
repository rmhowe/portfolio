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
  image: string;
  linkTo: string;
  tags: Tag[];
  logos: Logo[];
};

export const projectList: Project[] = [
  {
    title: 'WebGPU Game of Life',
    description: "Conway's Game of Life implemented in WebGPU and React.",
    image: '/static/images/webgpu-game-of-life-thumbnail.png',
    linkTo: 'webgpu-game-of-life',
    tags: ['GPU', 'Web'],
    logos: ['webgpu', 'typescript'],
  },
  {
    title: 'Cel Shader',
    description:
      'A cel shader in Three.js used for rapid prototyping and iteration.',
    image: '/static/images/cel-shader-thumbnail.png',
    linkTo: 'cel-shader',
    tags: ['Shaders', 'Web'],
    logos: ['threejs', 'typescript'],
  },
  {
    title: 'Procedural Bubble Shield',
    description: 'A procedurally created sci-fi inspired bubble shield VFX.',
    image: '/static/images/bubble-shield/bubble-shield-thumbnail.png',
    linkTo: 'bubble-shield',
    tags: ['Shaders', 'VFX'],
    logos: ['houdini', 'substance-designer', 'unreal'],
  },
  {
    title: 'Character Trail',
    description:
      'A character trail effect inspired by the Sandevistan in Cyberpunk Edgerunners.',
    image: '/static/images/character-trail/character-trail-thumbnail.png',
    linkTo: 'character-trail',
    tags: ['Shaders', 'VFX'],
    logos: ['unreal'],
  },
];
