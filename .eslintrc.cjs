module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  globals: {},
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  extends: [
    //
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: [],
  rules: {},
}
