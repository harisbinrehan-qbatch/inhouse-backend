module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
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
  rules: {
    'eslint/fix-on-save': 0,
    'react/jsx-filename-extension': 0,
    'import/no-extraneous-dependencies': 0,
    'react/function-component-definition': 0,
    'jsx-a11y/label-has-associated-control': 0,
    quotes: ['warn', 'single'],
    'react/prop-types': 'off',
    'import/no-unresolved': 0,
    'react/react-in-jsx-scope': 0,
    'import/extensions': 0,
    'no-console': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'no-param-reassign': 0,
    'react/destructuring-assignment': ['warn', 'always'],
    'react/no-array-index-key': 'off',
    'no-plusplus': 'off',
  },
};
