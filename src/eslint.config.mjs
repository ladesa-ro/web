import css from '@eslint/css';
import yml from 'eslint-plugin-yml';
import vueParser from 'vue-eslint-parser';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import { noCommentsPlugin } from './eslint.no-comments.mjs';

const IGNORES = [
  '**/node_modules/**',
  '**/dist/**',
  '**/.nuxt/**',
  '**/.output/**',
  '**/.nx/**',
  '**/storybook-static/**',
  '**/.vitest/**',
  'packages/ladesa-api-client/src/__generated__/**',
  'apps/sisgha-sisgea/.nuxt/**',
  'apps/sisgha-sisgea/.output/**',
];

export default [
  { ignores: IGNORES },

  { linterOptions: { reportUnusedDisableDirectives: 'off' } },

  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    },
    plugins: { ladesa: noCommentsPlugin, '@typescript-eslint': tsPlugin },
    rules: { 'ladesa/no-comments': 'error' },
  },

  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: { ladesa: noCommentsPlugin, '@typescript-eslint': tsPlugin },
    rules: { 'ladesa/no-comments': 'error' },
  },

  {
    files: ['**/*.css'],
    language: 'css/css',
    plugins: { css, ladesa: noCommentsPlugin },
    languageOptions: { tolerant: true },
    rules: { 'ladesa/no-css-comments': 'error' },
  },

  ...yml.configs['flat/base'],
  {
    files: ['**/*.{yml,yaml}'],
    plugins: { ladesa: noCommentsPlugin },
    rules: { 'ladesa/no-comments': 'error' },
  },
];
