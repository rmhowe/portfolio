'use client';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Particles } from './Particles';

export default function FlowField() {
  const model = useGLTF('/static/models/husky.glb');

  return (
    <Canvas
      camera={{
        fov: 75,
        near: 0.1,
        far: 1000,
        position: [2.2, 2, 3],
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
      <OrbitControls enableDamping target={[0, 1, 0]} />
      <Particles model={model} />
    </Canvas>
  );
}
