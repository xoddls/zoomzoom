const path = require('path');

module.exports = {
  root: true,
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['tsconfig.eslint.json'],
    sourceType: 'module',
    createDefaultProgram : true,
  },
  settings: {
    'import/resolver': {
      'typescript': {
        project: path.resolve(__dirname, 'tsconfig.eslint.json'),
      },
    },
  },
  extends: ['/../.eslintrc.base.js'],
};
