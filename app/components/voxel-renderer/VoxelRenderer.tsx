'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { VoxelGrid, VoxelType } from './VoxelGrid';
import { createNoise3D } from 'simplex-noise';
import alea from 'alea';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export const VoxelRenderer = () => {
  useEffect(() => {
    // Three.js setup
    const canvas = canvasRef.current!;
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x444488);

    const camera = new THREE.PerspectiveCamera(
      75,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1000
    );

    const orbitControls = new OrbitControls(camera, canvas);
    camera.position.set(0, 20, 50);
    orbitControls.update();

    const axesHelper = new THREE.AxesHelper();
    scene.add(axesHelper);

    // Voxel grid generation
    const chunkSize = 32;
    const voxelGrid = new VoxelGrid(chunkSize);
    const noise = createNoise3D(alea('seed'));

    for (let x = 0; x < chunkSize; x++) {
      for (let y = 0; y < chunkSize; y++) {
        for (let z = 0; z < 2; z++) {
          const noiseValue = noise(x, y, z);
          voxelGrid.setVoxel(
            x,
            y,
            z,
            noiseValue > 0.8
              ? VoxelType.Hazard
              : noiseValue > -0.05
                ? VoxelType.Occupied
                : VoxelType.Empty
          );
        }
      }
    }

    const { positions, normals, colors, indices } =
      voxelGrid.generateGeometryDataForChunk(0, 0, 0);
    const geometry = new THREE.BufferGeometry();
    const material = new THREE.MeshBasicMaterial({
      vertexColors: true,
      transparent: true,
      wireframe: true,
    });
    geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(new Float32Array(positions), 3)
    );
    geometry.setAttribute(
      'normal',
      new THREE.BufferAttribute(new Float32Array(normals), 3)
    );
    geometry.setAttribute(
      'color',
      new THREE.BufferAttribute(new Float32Array(colors), 4)
    );
    geometry.setIndex(indices);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.copy(new THREE.Vector3(-chunkSize / 2, -chunkSize / 2, 0));
    scene.add(mesh);

    function animate() {
      requestAnimationFrame(animate);
      orbitControls.update();
      renderer.render(scene, camera);
    }
    animate();
  }, []);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return <canvas className="w-full h-full" ref={canvasRef}></canvas>;
};
