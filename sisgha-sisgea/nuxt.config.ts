import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'node:url';

export default defineNuxtConfig({
  experimental: {
    normalizeComponentNames: true,
  },

  // ==============================================

  srcDir: './app',

  ssr: true,

  // ===========

  typescript: {
    typeCheck: true,
  },

  eslint: {},

  // ===========

  devtools: {
    enabled: true,
  },

  vite: {
    optimizeDeps: {
      include: [
        '@atlaskit/pragmatic-drag-and-drop',
        '@atlaskit/pragmatic-drag-and-drop-auto-scroll',
        '@atlaskit/pragmatic-drag-and-drop-hitbox',
      ],
    },

    plugins: [tailwindcss()],

    resolve: {
      alias: {
        '~': fileURLToPath(new URL('./app', import.meta.url)),
        '@': fileURLToPath(new URL('./app', import.meta.url)),
      },
    },
    ssr: {
      noExternal: [
        '@atlaskit/pragmatic-drag-and-drop',
        '@atlaskit/pragmatic-drag-and-drop-auto-scroll',
        '@atlaskit/pragmatic-drag-and-drop-hitbox',
      ],
    },
  },

  // ===========

  features: {
    inlineStyles: true,
  },

  // ==============================================

  css: ['~/assets/styles/app.css'],

  // ==============================================

  modules: [
    '@nuxtjs/color-mode',
    'vue3-carousel-nuxt',
    '@nuxt/eslint',
  ],

  colorMode: {
    preference: 'system',
    fallback: 'light',
    classPrefix: '',
    classSuffix: '',
  },

  // ===========

  nitro: {},

  compatibilityDate: '2026-01-31',
});
