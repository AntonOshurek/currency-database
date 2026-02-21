// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const prettier = require('eslint-plugin-prettier/recommended');

module.exports = defineConfig([
  prettier,
  {
    ignores: ['dist/*'],
  },
]);
