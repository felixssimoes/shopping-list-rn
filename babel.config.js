module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          app: './src/app',
          assets: './src/assets',
          config: './src/config',
          data: './src/data',
          services: './src/services',
          store: './src/store',
          ui: './src/ui',
          utils: './src/utils',
        },
      },
    ],
  ],
};
