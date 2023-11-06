module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb', 'plugin:react/recommended'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  // rules: { '@typescript-eslint/comma-dangle': 'off' },
}
