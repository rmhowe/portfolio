import type { NextConfig } from 'next';

const shaderFileConfig = {
  loaders: ['raw-loader'],
  as: '*.js',
};
const nextConfig: NextConfig = {
  images: {
    loader: 'custom',
    loaderFile: './app/utils/cloudflareImageLoader.ts',
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(vert|frag|glsl|wgsl)$/,
      use: 'raw-loader',
    });
    return config;
  },
  turbopack: {
    rules: {
      '*.vert': shaderFileConfig,
      '*.frag': shaderFileConfig,
      '*.glsl': shaderFileConfig,
      '*.wgsl': shaderFileConfig,
    },
  },
};

export default nextConfig;

import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
initOpenNextCloudflareForDev();
