// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt({
  rules: {
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
  },
}).override('nuxt/typescript/rules', {
  // Your custom configs here,
  rules: {
    // ...Override rules, for example:
    '@typescript-eslint/no-explicit-any': 'off',
  },
});
