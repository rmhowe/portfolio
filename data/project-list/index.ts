export type Tag =
  | 'Materials'
  | 'Procedural'
  | 'Shaders'
  | 'Three.js'
  | 'TypeScript'
  | 'Unreal'
  | 'Unity'
  | 'VFX';

export type Project = {
  title: string;
  description: string;
  image: string;
  linkTo: string;
  tags: Tag[];
};

export const projectList: Project[] = [
  {
    title: 'Procedural Bubble Shield',
    description: 'A procedurally created sci-fi inspired bubble shield VFX',
    image: '/static/images/bubble-shield/bubble-shield-thumbnail.png',
    linkTo: 'bubble-shield',
    tags: ['Unreal', 'Materials', 'VFX'],
  },
  {
    title: 'Cel Shader',
    description:
      'A cel shader in Three.js used for rapid prototyping and iteration',
    image: '/static/images/cel-shader-thumbnail.png',
    linkTo: 'cel-shader',
    tags: ['Shaders', 'Three.js'],
  },
  {
    title: 'Particle Galaxy',
    description: 'A 3D galaxy animation made using ThreeJS particles',
    image: '/static/images/particle-galaxy-thumbnail.png',
    linkTo: 'particle-galaxy',
    tags: ['Three.js', 'VFX'],
  },
  {
    title: 'Picross',
    description: 'A nonogram puzzle game made using React and Tailwind',
    image: '/static/images/picross-thumbnail.png',
    linkTo: 'picross',
    tags: ['TypeScript'],
  },
];
