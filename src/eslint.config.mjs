import css from '@eslint/css';
import yml from 'eslint-plugin-yml';
import vueParser from 'vue-eslint-parser';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import sonarjs from 'eslint-plugin-sonarjs';
import vue from 'eslint-plugin-vue';
import { noCommentsPlugin } from './eslint.no-comments.mjs';

const COGNITIVE_COMPLEXITY_MAX = 15;

const MAX_LINES_PER_FILE = 300;

const MAX_LINES_PER_BLOCK = { template: 120, script: 150, style: 120 };

const MAX_TEMPLATE_DEPTH = 6;

const MAX_PROPS = 8;

const sizeRules = {
  'max-lines': [
    'warn',
    { max: MAX_LINES_PER_FILE, skipBlankLines: true, skipComments: true },
  ],
};

const IGNORES = [
  '**/node_modules/**',
  '**/dist/**',
  '**/.nuxt/**',
  '**/.output/**',
  '**/.nx/**',
  '**/storybook-static/**',
  '**/.vitest/**',
  '**/__generated__/**',
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
    plugins: {
      ladesa: noCommentsPlugin,
      '@typescript-eslint': tsPlugin,
      sonarjs,
    },
    rules: {
      ...sizeRules,
      'ladesa/no-comments': 'error',
      'sonarjs/cognitive-complexity': ['warn', COGNITIVE_COMPLEXITY_MAX],
    },
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
    plugins: {
      ladesa: noCommentsPlugin,
      '@typescript-eslint': tsPlugin,
      sonarjs,
      vue,
    },
    rules: {
      ...sizeRules,
      'ladesa/no-comments': 'error',
      'sonarjs/cognitive-complexity': ['warn', COGNITIVE_COMPLEXITY_MAX],
      'vue/max-lines-per-block': ['warn', MAX_LINES_PER_BLOCK],
      'vue/max-template-depth': ['warn', { maxDepth: MAX_TEMPLATE_DEPTH }],
      'vue/max-props': ['warn', { maxProps: MAX_PROPS }],
    },
  },

  {
    files: ['**/*.css'],
    language: 'css/css',
    plugins: { css, ladesa: noCommentsPlugin },
    languageOptions: { tolerant: true },
    rules: { 'ladesa/no-css-comments': 'error' },
  },

  {
    files: ['packages/*/src/index.ts'],
    rules: { 'max-lines': 'off' },
  },

  ...yml.configs['flat/base'],
  {
    files: ['**/*.{yml,yaml}'],
    plugins: { ladesa: noCommentsPlugin },
    rules: { 'ladesa/no-comments': 'error' },
  },
];
