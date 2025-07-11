'use client';
import * as THREE from 'three';
import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import celVertexShader from './cel.vert';
import celFragmentShader from './cel.frag';
import { useControls } from 'leva';

function ThreeSphere() {
  const { gl } = useThree();
  const format = gl.capabilities.isWebGL2 ? THREE.RedFormat : THREE.AlphaFormat;
  const colors = new Uint8Array(3);
  for (let c = 0; c <= colors.length; c++) {
    colors[c] = (c / colors.length) * 256;
  }
  const gradientMap = new THREE.DataTexture(colors, colors.length, 1, format);
  gradientMap.needsUpdate = true;

  const diffuseColor = new THREE.Color().setHSL(0, 0.5, 0.5);
  return (
    <mesh position={[1.5, 0, 0]}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshToonMaterial color={diffuseColor} gradientMap={gradientMap} />
    </mesh>
  );
}

function ParticleLight() {
  const lightMesh = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const timer = clock.getElapsedTime() * 0.25;
    if (lightMesh.current) {
      lightMesh.current.position.set(
        Math.sin(timer * 7) * 300,
        Math.cos(timer * 5) * 400,
        Math.cos(timer * 3) * 300
      );
    }
  });

  return (
    <mesh ref={lightMesh}>
      <sphereGeometry args={[4, 8, 8]} />
      <meshBasicMaterial color={0xffffff} />
      <pointLight args={[0xffffff, 2, 800, 0]} />
    </mesh>
  );
}

function MySphere() {
  const { color, glossiness } = useControls({
    color: '#6495ed',
    glossiness: 10,
  });
  return (
    <mesh position={[-1.5, 0, 0]} castShadow receiveShadow>
      <sphereGeometry args={[1, 64, 64]} />
      <shaderMaterial
        lights
        uniforms={{
          ...THREE.UniformsLib.lights,
          uColor: { value: new THREE.Color(color) },
          uGlossiness: { value: glossiness },
        }}
        vertexShader={celVertexShader}
        fragmentShader={celFragmentShader}
        key={`${color}${glossiness}`}
      />
    </mesh>
  );
}

export function CelShader() {
  return (
    <Canvas
      camera={{
        fov: 75,
        near: 0.1,
        far: 1000,
        position: [0, 0, 6],
        rotation: [1, 1, 0],
      }}
      scene={{ background: new THREE.Color(0x444488) }}
      shadows={{ enabled: true, type: THREE.PCFSoftShadowMap }}
    >
      <directionalLight
        color={0xffffff}
        intensity={0.8}
        position={[0, 1, 1]}
        target-position={[0, 0, 0]}
      />
      <ambientLight color={0xc1c1c1} intensity={3} />
      <OrbitControls enableDamping />
      <ParticleLight />
      <MySphere />
      <ThreeSphere />
    </Canvas>
  );
}
