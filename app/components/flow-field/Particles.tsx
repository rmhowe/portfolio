'use client';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import {
  GPUComputationRenderer,
  Variable,
} from 'three/examples/jsm/misc/GPUComputationRenderer.js';
import particlePositionShader from './shaders/particle-position.glsl';
import particleFragShader from './shaders/particle.frag';
import particleVertShader from './shaders/particle.vert';
import { GLTF, mergeBufferGeometries } from 'three-stdlib';
import simplexNoise4d from './shaders/simplexNoise4d.glsl';

const pixelRatio = Math.min(window.devicePixelRatio, 2);

export function Particles({ model }: { model: GLTF }) {
  const { gl, size } = useThree();

  const computationRendererRef = useRef<GPUComputationRenderer>(null);
  const computationRenderer = computationRendererRef.current;
  const positionVariableRef = useRef<Variable>(null);
  const particleGeometryRef = useRef<THREE.BufferGeometry>(null);
  const particleMaterialRef = useRef<THREE.ShaderMaterial>(null);

  useEffect(() => {
    (THREE.ShaderChunk as any)['simplexNoise4d'] = simplexNoise4d;

    const geometries: THREE.BufferGeometry[] = [];
    model.scene.traverse((child: any) => {
      if (child.isMesh && child.geometry) {
        geometries.push(child.geometry);
      }
    });
    const baseGeometry = mergeBufferGeometries(geometries);
    const particleCount = baseGeometry!.attributes.position.count;
    const positionTextureSize = Math.ceil(Math.sqrt(particleCount));
    computationRendererRef.current = new GPUComputationRenderer(
      positionTextureSize,
      positionTextureSize,
      gl
    );
    const computationRenderer = computationRendererRef.current;

    const particleUVs = new Float32Array(particleCount * 2);
    const particleSizes = new Float32Array(particleCount);
    const particleColors = new Float32Array(particleCount * 3);
    for (let y = 0; y < positionTextureSize; y++) {
      for (let x = 0; x < positionTextureSize; x++) {
        const i = y * positionTextureSize + x;
        const i2 = i * 2;
        const i3 = i * 3;

        const uvX = (x + 0.5) / positionTextureSize;
        const uvY = (y + 0.5) / positionTextureSize;

        particleUVs[i2] = uvX;
        particleUVs[i2 + 1] = uvY;

        particleSizes[i] = Math.random();

        particleColors[i3] = Math.random() * 0.8 + 0.1;
        particleColors[i3 + 1] = Math.random() * 0.8 + 0.1;
        particleColors[i3 + 2] = Math.random() * 0.8 + 0.1;
      }
    }
    particleGeometryRef.current?.setDrawRange(0, particleCount);
    particleGeometryRef.current?.setAttribute(
      'aParticleUV',
      new THREE.BufferAttribute(particleUVs, 2)
    );
    particleGeometryRef.current?.setAttribute(
      'aParticleSize',
      new THREE.BufferAttribute(particleSizes, 1)
    );
    particleGeometryRef.current?.setAttribute(
      'aParticleColor',
      //   baseGeometry.attributes.color
      new THREE.BufferAttribute(particleColors, 3)
    );

    const particlePositionTexture = computationRenderer.createTexture();
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const i4 = i * 4;
      (particlePositionTexture.image.data as any)[i4 + 0] =
        baseGeometry!.attributes.position.array[i3 + 0];
      (particlePositionTexture.image.data as any)[i4 + 1] =
        baseGeometry!.attributes.position.array[i3 + 1];
      (particlePositionTexture.image.data as any)[i4 + 2] =
        baseGeometry!.attributes.position.array[i3 + 2];
      (particlePositionTexture.image.data as any)[i4 + 3] = Math.random();
    }

    positionVariableRef.current = computationRenderer.addVariable(
      'uParticlePosition',
      particlePositionShader,
      particlePositionTexture
    );
    const positionVariable = positionVariableRef.current;
    computationRenderer.setVariableDependencies(positionVariable, [
      positionVariable,
    ]);
    positionVariable.material.uniforms.uTime = new THREE.Uniform(0);
    positionVariable.material.uniforms.uDeltaTime = new THREE.Uniform(0);
    positionVariable.material.uniforms.uInitialPositionTexture =
      new THREE.Uniform(particlePositionTexture);

    computationRenderer.init();
  }, []);

  useFrame(({ clock }, delta) => {
    if (positionVariableRef.current) {
      positionVariableRef.current.material.uniforms.uTime.value =
        clock.elapsedTime;
      positionVariableRef.current.material.uniforms.uDeltaTime.value = delta;
    }

    if (computationRenderer) {
      computationRenderer?.compute();
      if (particleMaterialRef.current) {
        particleMaterialRef.current.uniforms.uPositionTexture.value =
          computationRenderer?.getCurrentRenderTarget(
            positionVariableRef.current!
          ).texture;
      }
    }
  });

  return (
    <>
      <points rotation={[-Math.PI / 2, 0, 0]} scale={3}>
        <bufferGeometry ref={particleGeometryRef} />
        <shaderMaterial
          ref={particleMaterialRef}
          vertexShader={particleVertShader}
          fragmentShader={particleFragShader}
          uniforms={{
            uSize: new THREE.Uniform(0.03),
            uResolution: new THREE.Uniform(
              new THREE.Vector2(
                size.width * pixelRatio,
                size.height * pixelRatio
              )
            ),
            uPositionTexture: new THREE.Uniform(null),
          }}
        />
      </points>
      <mesh position={[2, 0, 0]} visible={false}>
        <planeGeometry args={[3, 3]} />
        <meshBasicMaterial
          map={
            computationRenderer?.getCurrentRenderTarget(
              positionVariableRef.current!
            ).texture
          }
        />
      </mesh>
    </>
  );
}
