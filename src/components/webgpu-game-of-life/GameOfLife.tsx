import renderShader from './render.wgsl?raw';
import computeShader from './compute.wgsl?raw';
import { useEffect, useRef, useState } from 'react';
import { Pause, Play, SkipForward } from 'lucide-react';

const GRID_SIZE = 32;

function createVertexBuffer({ device }: { device: GPUDevice }) {
  // Index buffer?
  const vertices = new Float32Array([
    -0.8, -0.8, 0.8, -0.8, 0.8, 0.8, -0.8, -0.8, 0.8, 0.8, -0.8, 0.8,
  ]);
  const vertexBuffer = device.createBuffer({
    label: 'Cell vertices',
    size: vertices.byteLength,
    usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
  });
  device.queue.writeBuffer(vertexBuffer, 0, vertices);
  return { vertices, vertexBuffer };
}

function createUniformBuffer({ device }: { device: GPUDevice }) {
  const uniformArray = new Float32Array([GRID_SIZE, GRID_SIZE]);
  const uniformBuffer = device.createBuffer({
    label: 'Grid uniforms',
    size: uniformArray.byteLength,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  });
  device.queue.writeBuffer(uniformBuffer, 0, uniformArray);
  return { uniformArray, uniformBuffer };
}

function createCellStateStorageBuffers({ device }: { device: GPUDevice }) {
  const cellStateArray = new Uint32Array(GRID_SIZE * GRID_SIZE);
  const cellStateStorageBuffers = [
    device.createBuffer({
      label: 'Cell state A',
      size: cellStateArray.byteLength,
      usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
    }),
    device.createBuffer({
      label: 'Cell state B',
      size: cellStateArray.byteLength,
      usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
    }),
  ];
  for (let i = 0; i < cellStateArray.length; i += 3) {
    cellStateArray[i] = Math.random() > 0.4 ? 1 : 0;
  }
  device.queue.writeBuffer(cellStateStorageBuffers[0], 0, cellStateArray);
  device.queue.writeBuffer(cellStateStorageBuffers[1], 0, cellStateArray);
  return { cellStateArray, cellStateStorageBuffers };
}

function createBindGroups({
  device,
  uniformBuffer,
  cellStateStorageBuffers,
}: {
  device: GPUDevice;
  uniformBuffer: GPUBuffer;
  cellStateStorageBuffers: GPUBuffer[];
}) {
  const bindGroupLayout = device.createBindGroupLayout({
    label: 'Cell bind group layout',
    entries: [
      {
        binding: 0,
        visibility:
          GPUShaderStage.VERTEX |
          GPUShaderStage.FRAGMENT |
          GPUShaderStage.COMPUTE,
        buffer: { type: 'uniform' },
      },
      {
        binding: 1,
        visibility: GPUShaderStage.VERTEX | GPUShaderStage.COMPUTE,
        buffer: { type: 'read-only-storage' },
      },
      {
        binding: 2,
        visibility: GPUShaderStage.COMPUTE,
        buffer: { type: 'storage' },
      },
    ] as const,
  });
  const bindGroups = [
    device.createBindGroup({
      label: 'Cell renderer bind group A',
      layout: bindGroupLayout,
      entries: [
        {
          binding: 0,
          resource: { buffer: uniformBuffer },
        },
        {
          binding: 1,
          resource: { buffer: cellStateStorageBuffers[0] },
        },
        {
          binding: 2,
          resource: { buffer: cellStateStorageBuffers[1] },
        },
      ],
    }),
    device.createBindGroup({
      label: 'Cell renderer bind group B',
      layout: bindGroupLayout,
      entries: [
        {
          binding: 0,
          resource: { buffer: uniformBuffer },
        },
        {
          binding: 1,
          resource: { buffer: cellStateStorageBuffers[1] },
        },
        {
          binding: 2,
          resource: { buffer: cellStateStorageBuffers[0] },
        },
      ],
    }),
  ];
  return { bindGroups, bindGroupLayout };
}

function createCellRenderPipeline({
  device,
  pipelineLayout,
  textureFormat,
}: {
  device: GPUDevice;
  pipelineLayout: GPUPipelineLayout;
  textureFormat: GPUTextureFormat;
}) {
  const vertexBufferLayout = {
    arrayStride: 8,
    attributes: [
      {
        format: 'float32x2',
        offset: 0,
        shaderLocation: 0,
      },
    ],
  } as const;
  const cellRenderModule = device.createShaderModule({
    label: 'Cell shader',
    code: renderShader,
  });
  return device.createRenderPipeline({
    label: 'Cell pipeline',
    layout: pipelineLayout,
    vertex: {
      module: cellRenderModule,
      entryPoint: 'vertexMain',
      buffers: [vertexBufferLayout],
    },
    fragment: {
      module: cellRenderModule,
      entryPoint: 'fragmentMain',
      targets: [
        {
          format: textureFormat,
        },
      ],
    },
  });
}

function createCellComputePipeline({
  device,
  pipelineLayout,
}: {
  device: GPUDevice;
  pipelineLayout: GPUPipelineLayout;
}) {
  const cellComputeModule = device.createShaderModule({
    label: 'GoL Simulation shader',
    code: computeShader,
  });
  return device.createComputePipeline({
    label: 'Simulation pipeline',
    layout: pipelineLayout,
    compute: {
      module: cellComputeModule,
      entryPoint: 'computeMain',
    },
  });
}

export const GameOfLife = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string>('');
  const [progressOneStep, setProgressOneStep] = useState<() => void>(() => {});
  const [simulationInterval, setSimulationInterval] = useState<number | null>(
    null
  );
  const isPlaying = simulationInterval !== null;

  const playPause = () => {
    if (simulationInterval === null) {
      setSimulationInterval(window.setInterval(progressOneStep, 300));
      return;
    }
    window.clearInterval(simulationInterval);
    setSimulationInterval(null);
  };

  const simulationSetup = async () => {
    if (!canvasRef.current) {
      return;
    }

    if (!navigator.gpu) {
      setError('WebGPU not supported on this browser');
      return;
    }

    const context = canvasRef.current.getContext('webgpu');
    if (!context) {
      setError('Could not obtain WebGPU canvas context');
      return;
    }

    const adapter = await navigator.gpu.requestAdapter();
    if (!adapter) {
      setError('No appropriate GPUAdapter found');
      return;
    }

    const device = await adapter.requestDevice();
    const textureFormat = navigator.gpu.getPreferredCanvasFormat();
    context.configure({
      device,
      format: textureFormat,
    });

    const { vertices, vertexBuffer } = createVertexBuffer({ device });
    const { uniformBuffer } = createUniformBuffer({ device });
    const { cellStateStorageBuffers } = createCellStateStorageBuffers({
      device,
    });
    const { bindGroups, bindGroupLayout } = createBindGroups({
      device,
      uniformBuffer,
      cellStateStorageBuffers,
    });

    const pipelineLayout = device.createPipelineLayout({
      label: 'Cell pipeline layout',
      bindGroupLayouts: [bindGroupLayout],
    });
    const cellRenderPipeline = createCellRenderPipeline({
      device,
      pipelineLayout,
      textureFormat,
    });
    const cellComputePipeline = createCellComputePipeline({
      device,
      pipelineLayout,
    });

    let step = 0;
    function updateGrid() {
      const encoder = device.createCommandEncoder();
      const computePass = encoder.beginComputePass();

      computePass.setPipeline(cellComputePipeline);
      computePass.setBindGroup(0, bindGroups[step % 2]);

      const workgroupCount = Math.ceil(GRID_SIZE / 8);
      computePass.dispatchWorkgroups(workgroupCount, workgroupCount);

      computePass.end();

      step++;
      const renderPass = encoder.beginRenderPass({
        colorAttachments: [
          {
            view: context!.getCurrentTexture().createView(),
            loadOp: 'clear',
            clearValue: [0.2, 0.2, 0.2, 1],
            storeOp: 'store',
          },
        ] as const,
      });

      renderPass.setPipeline(cellRenderPipeline);
      renderPass.setVertexBuffer(0, vertexBuffer);
      renderPass.setBindGroup(0, bindGroups[step % 2]);
      renderPass.draw(vertices.length / 2, GRID_SIZE * GRID_SIZE);

      renderPass.end();
      device.queue.submit([encoder.finish()]);
    }
    setProgressOneStep(() => updateGrid);
    updateGrid();
  };

  useEffect(() => {
    simulationSetup();
  }, [canvasRef]);

  return (
    <div className="text-center">
      <div className="flex justify-center gap-2 mb-2">
        <button className="button" onClick={playPause}>
          {isPlaying ? <Pause /> : <Play />}
        </button>
        <button className="button" onClick={progressOneStep}>
          <SkipForward />
        </button>
      </div>
      {error && <p className="text-center">{error}</p>}
      <canvas
        className="m-auto rounded-lg"
        ref={canvasRef}
        width="512"
        height="512"
      ></canvas>
    </div>
  );
};
