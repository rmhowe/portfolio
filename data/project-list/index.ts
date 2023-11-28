export type Tag = 'Materials' | 'Modelling' | 'Shaders' | 'VFX';

export type Logo =
  | 'houdini'
  | 'substance-designer'
  | 'threejs'
  | 'typescript'
  | 'unreal';

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
    title: 'Character Trail',
    description:
      'A character trail effect inspired by the Sandevistan in Cyberpunk Edgerunners.',
    image: '/static/images/character-trail/character-trail-thumbnail.png',
    linkTo: 'character-trail',
    tags: ['Materials', 'VFX'],
    logos: ['unreal'],
  },
  {
    title: 'Procedural Bubble Shield',
    description: 'A procedurally created sci-fi inspired bubble shield VFX.',
    image: '/static/images/bubble-shield/bubble-shield-thumbnail.png',
    linkTo: 'bubble-shield',
    tags: ['Materials', 'Modelling', 'VFX'],
    logos: ['houdini', 'substance-designer', 'unreal'],
  },
  {
    title: 'Cel Shader',
    description:
      'A cel shader in Three.js used for rapid prototyping and iteration.',
    image: '/static/images/cel-shader-thumbnail.png',
    linkTo: 'cel-shader',
    tags: ['Shaders'],
    logos: ['threejs', 'typescript', 'unreal'],
  },
];
