module.exports = {
  root: true,
  extends: '@react-native-community',
  plugins: ['prettier'],
  rules: {
    'arrow-body-style': 0,
    'no-underscore-dangle': 0,
    'max-len': [
      2,
      {
        code: 100,
        ignoreComments: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
  },
  globals: {
    __DEV__: false,
    window: true,
    document: true,
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
      },
    },
  },
};
