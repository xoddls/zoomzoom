module.exports = {
  env: {
    node: true,
  },
  extends: [
    'airbnb-typescript/base',
    'plugin:import/recommended',
  ],
  rules: {
    'max-len': ['error', 200, 2, {
      ignoreUrls: true,
      ignoreComments: true,
      ignoreRegExpLiterals: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
    }],
    'import/no-cycle': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    /**
     * @typescript-eslint/indent 참고 규칙
     * - https://github.com/iamturns/eslint-config-airbnb-typescript/blob/91fd090f6fdd8d598a6ac6e9bb2c2ba33014e425/lib/shared.js#L97
     * - https://github.com/eggjs/eslint-config-egg/pull/61/files#diff-6088b15583328eb4434be1744b8acfd022dfd59ed01b1fe2e9ea0b9cae3642a4L90
     */
    '@typescript-eslint/indent': [ 'error', 2, {
      SwitchCase: 1,
      VariableDeclarator: 1,
      outerIIFEBody: 1,
      // MemberExpression: null,
      FunctionDeclaration: {
        parameters: 1,
        body: 1
      },
      FunctionExpression: {
        parameters: 1,
        body: 1
      },
      CallExpression: {
        arguments: 1
      },
      ArrayExpression: 1,
      ObjectExpression: 1,
      ImportDeclaration: 1,
      flatTernaryExpressions: false,
      ignoreComments: false,
      ignoredNodes: [
        'FunctionExpression > .params[decorators.length > 0]',
        'FunctionExpression > .params > :matches(Decorator, :not(:first-child))',
        'ClassBody.body > PropertyDefinition[decorators.length > 0] > .key',
      ],
    }],
  },
  ignorePatterns: [
    'dist',
    'node_modules',
    'migrations',
  ],
};
