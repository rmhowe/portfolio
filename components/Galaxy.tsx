import * as THREE from 'three';
import React from 'react';
import { Canvas, extend } from '@react-three/fiber';
import {
  OrbitControls,
  Point,
  Points,
  shaderMaterial,
  Stars,
} from '@react-three/drei';
import { MathUtils } from 'three';

const MyPointsMaterial = shaderMaterial(
  {
    u: 1,
  },
  `
    attribute float size;
    attribute vec3 color;

    varying vec3 vColor;

    void main() {
      vColor = color;
      vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
      gl_PointSize = size * ( 300.0 / -mvPosition.z );
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  `
    varying vec3 vColor;

    void main() {
      gl_FragColor = vec4( vColor, 1.0 );

      #include <tonemapping_fragment>
      #include <encodings_fragment>
    }
  `
);
extend({ MyPointsMaterial });

function GalaxyPoints() {
  const n = 10000;
  const radius = 5;
  const branches = 3;
  const branchAngles = Array.from({ length: branches }).map((item, index) =>
    MathUtils.degToRad((360 / branches) * index)
  );
  const spin = 1;
  const randomness = 0.2;
  const randomnessPower = 3;
  const insideColor = new THREE.Color('#ff6030');
  const outsideColor = new THREE.Color('#1b3984');

  const [points] = React.useState(() => {
    return Array.from({ length: n }).map((item, index) => {
      const r = MathUtils.randFloat(0.2, radius);

      const branchAngle = branchAngles[index % branches];
      const spinAngle = r * spin;

      const randomX =
        Math.pow(Math.random(), randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        randomness *
        r;
      const randomY =
        Math.pow(Math.random(), randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        randomness *
        r;
      const randomZ =
        Math.pow(Math.random(), randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        randomness *
        r;

      const mixedColor = insideColor.clone();
      mixedColor.lerp(outsideColor, r / radius);

      return {
        position: [
          Math.cos(branchAngle + spinAngle) * r + randomX,
          randomY,
          Math.sin(branchAngle + spinAngle) * r + randomZ,
        ],
        color: [mixedColor.r, mixedColor.g, mixedColor.b],
      };
    });
  });
  return (
    <Points limit={n}>
      {points.map((point, index) => (
        <Point
          key={index}
          // @ts-ignore
          position={point.position}
          color={point.color}
          size={Math.random() * 0.5 + 0.1}
        />
      ))}
      <pointsMaterial size={0.01} vertexColors />
    </Points>
  );
}
export function Galaxy() {
  return (
    <Canvas
      camera={{
        fov: 75,
        near: 0.1,
        far: 1000,
        position: [0, 3, 3],
        rotation: [1, 1, 0],
      }}
    >
      <ambientLight intensity={0.7} />
      <OrbitControls enableDamping />
      <Stars />
      <GalaxyPoints />
    </Canvas>
  );
}
