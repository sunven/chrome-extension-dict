module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    es2021: true,
  },
  // airbnb 等同于 eslint-config-airbnb
  extends: ['airbnb', 'plugin:prettier/recommended'],
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
  // settings: {
  //   'import/resolver': {
  //     typescript: {},
  //   },
  // },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
}
