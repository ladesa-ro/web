import { fileURLToPath, URL } from 'node:url';

export default defineNuxtConfig({
  extends: ['@ladesa-ro/web.ui.nuxt'],

  experimental: {
    normalizeComponentNames: true,
  },

  // ==============================================

  srcDir: './app',

  ssr: true,

  imports: {
    dirs: ['composables/ladesa-api', 'composables/query-helpers'],
  },

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
        '@vue/devtools-core',
        '@vue/devtools-kit',
        '@tanstack/query-persist-client-core',
        '@tanstack/query-sync-storage-persister',
        '@tanstack/vue-query',
        'dayjs', // CJS
        'dayjs/locale/pt-br', // CJS
        'dayjs/plugin/customParseFormat', // CJS
        'dayjs/plugin/isBetween', // CJS
        'dayjs/plugin/updateLocale', // CJS
        'dayjs/plugin/weekOfYear', // CJS
        'lodash/groupBy', // CJS
        'lodash/map', // CJS
        'lodash/mapValues', // CJS
        'lodash/uniq', // CJS
        'lodash/filter', // CJS
        'lodash/uniqBy', // CJS
        'reka-ui',
        'vee-validate',
        'yup',
        '@vueuse/core',
        'vue3-dropzone',
        'dayjs/plugin/customParseFormat.js', // CJS
        'dayjs/plugin/timezone.js', // CJS
        'dayjs/plugin/utc.js', // CJS
        'dayjs/plugin/relativeTime', // CJS
      ],
    },

    resolve: {
      alias: {
        '~': fileURLToPath(new URL('./app', import.meta.url)),
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

  modules: ['@nuxtjs/color-mode', 'vue3-carousel-nuxt', '@nuxt/eslint'],

  colorMode: {
    preference: 'system',
    fallback: 'light',
    classPrefix: '',
    classSuffix: '',
  },

  // ===========

  routeRules: {
    '/': { redirect: '/sisgha/dape' },
  },

  nitro: {},

  compatibilityDate: '2026-01-31',
});
