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
        webextensions: true,
        browser: true,
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
  settings: {
    'import/resolver': {
      webpack: { config: './webpack/webpack.dev.js' },
      typescript: {},
    },
  },
  plugins: ['prettier'],
  rules: {
    'no-console': 0,
    'prettier/prettier': 'error',
    'react/function-component-definition': 0,
    'react/jsx-filename-extension': 0,
    'react/no-array-index-key': 0,
    'react/jsx-props-no-spreading': 0,
    'import/extensions': 0, // https://stackoverflow.com/questions/59265981/typescript-eslint-missing-file-extension-ts-import-extensions
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'no-cond-assign': 0,
    'no-plusplus': 0,
    'no-undef': ['error', { chrome: true }],
  },
}
