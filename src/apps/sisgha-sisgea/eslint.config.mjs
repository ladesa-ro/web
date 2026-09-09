import withNuxt from './.nuxt/eslint.config.mjs';
import { noCommentsPlugin } from '../../eslint.no-comments.mjs';

export default withNuxt({
  plugins: { ladesa: noCommentsPlugin },
  rules: {
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'ladesa/no-comments': 'error',
  },
}).override('nuxt/typescript/rules', {
  rules: {
    '@typescript-eslint/no-explicit-any': 'warn',
  },
});
