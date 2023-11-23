export const projectList = [
  {
    title: 'Bubble Shield',
    description: 'A sci-fi inspired bubble shield VFX',
    image: '/static/images/bubble-shield-thumbnail.png',
    linkTo: 'bubble-shield',
    featured: true,
  },
  {
    title: 'Cel Shader',
    description:
      'A cel shader in Three.js used for rapid prototyping and iteration',
    image: '/static/images/cel-shader-thumbnail.png',
    linkTo: 'cel-shader',
    featured: true,
  },
  {
    title: 'Particle Galaxy',
    description: 'A 3D galaxy animation made using ThreeJS particles',
    image: '/static/images/particle-galaxy-thumbnail.png',
    linkTo: 'particle-galaxy',
    featured: true,
  },
  {
    title: 'Picross',
    description: 'A nonogram puzzle game made using React and Tailwind',
    image: '/static/images/picross-thumbnail.png',
    linkTo: 'picross',
    featured: false,
  },
];
export type Project = (typeof projectList)[0];
