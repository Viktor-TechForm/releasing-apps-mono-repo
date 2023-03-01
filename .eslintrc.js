module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  rules: {
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'no-underscore-dangle': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
    'dot-notation': 'off',
  },
};
