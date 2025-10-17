'use client';
import * as THREE from 'three';
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import asteroidData from './asteroids.json';
import planets from './planets.json';
import { Line } from '@react-three/drei';

const asteroids = asteroidData.near_earth_objects;

type OrbitalData =
  | (typeof asteroids)[0]['orbital_data']
  | (typeof planets)[0]['orbital_data'];
type OrbitProps = {
  orbitalData: OrbitalData;
  color?: string;
  lineWidth?: number;
};
function Orbit({ orbitalData, color, lineWidth }: OrbitProps) {
  const a = parseFloat(orbitalData.semi_major_axis); // in AU
  const e = parseFloat(orbitalData.eccentricity);
  const i = THREE.MathUtils.degToRad(parseFloat(orbitalData.inclination));
  const uOmega = THREE.MathUtils.degToRad(
    parseFloat(orbitalData.ascending_node_longitude)
  );
  const lOmega = THREE.MathUtils.degToRad(
    parseFloat(orbitalData.perihelion_argument)
  );

  const points = [];
  const steps = 256; // resolution of orbit

  for (let t = 0; t <= steps; t++) {
    const E = (t / steps) * 2 * Math.PI; // eccentric anomaly

    // Orbit in orbital plane
    const x = a * (Math.cos(E) - e);
    const y = a * Math.sqrt(1 - e * e) * Math.sin(E);
    const z = 0;

    // Vector
    const v = new THREE.Vector3(x, y, z);

    // Apply rotation matrices: Rz(uOmega) * Rx(i) * Rz(lOmega)
    v.applyAxisAngle(new THREE.Vector3(0, 0, 1), lOmega); // rotate by lOmega around Z
    v.applyAxisAngle(new THREE.Vector3(1, 0, 0), i); // rotate by i around X
    v.applyAxisAngle(new THREE.Vector3(0, 0, 1), uOmega); // rotate by uOmega around Z

    points.push(v);
  }

  return (
    <Line points={points} color={color ?? 'white'} linewidth={lineWidth ?? 2} />
  );
}

export function Asteroids() {
  return (
    <Canvas
      camera={{
        fov: 75,
        near: 0.1,
        far: 1000,
        position: [2, 2, 2],
      }}
      scene={{ background: new THREE.Color(0x000000) }}
      shadows={{ enabled: true, type: THREE.PCFSoftShadowMap }}
    >
      <directionalLight
        color={0xffffff}
        intensity={0.8}
        position={[0, 1, 1]}
        target-position={[0, 0, 0]}
      />
      <ambientLight color={0xc1c1c1} intensity={1} />
      <OrbitControls enableDamping />
      <axesHelper />
      <group rotation={[Math.PI / 2, 0, 0]}>
        {asteroids.slice(0, 10).map((asteroid) => (
          <Orbit
            key={asteroid.id}
            orbitalData={asteroid.orbital_data}
            color="brown"
            lineWidth={1}
          />
        ))}
        {planets.map((planet) => (
          <Orbit
            key={planet.id}
            orbitalData={planet.orbital_data}
            color="blue"
            lineWidth={3}
          />
        ))}
      </group>
    </Canvas>
  );
}
