module.exports = {
  output: 'export',
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      use: 'ts-shader-loader',
    });
    config.module.rules.push({
      test: /\.wgsl$/i,
      type: 'asset/source',
    });
    return config;
  },
};
