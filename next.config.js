module.exports = {
  output: 'export',
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      use: 'ts-shader-loader',
    });
    return config;
  },
};
