const typescriptConfig = require('@typescript-eslint/eslint-plugin')
const parser = require('@typescript-eslint/parser')
const prettierConfig = require('eslint-config-prettier')
const prettierPlugin = require('eslint-plugin-prettier')

module.exports = [
  {
    ...typescriptConfig.configs['eslint-recommended-raw'],
  },
  prettierConfig,
  {
    ignores: ['node_modules', 'dist'],
    languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
    plugins: {
      '@typescript-eslint': typescriptConfig,
      prettier: prettierPlugin,
    },
  },
]
