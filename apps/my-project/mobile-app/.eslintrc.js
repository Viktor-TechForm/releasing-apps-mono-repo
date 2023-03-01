/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  extends: '../../../.eslintrc.js',
  ignorePatterns: [
    'metro.config.js',
    'babel.config.js',
    'declarations',
    'src/lib/config/.config.ts',
  ],
  rules: {
    'no-console': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {argsIgnorePattern: '^_', varsIgnorePattern: '^_'},
    ],
    'no-use-before-define': 'off',
  },
};
