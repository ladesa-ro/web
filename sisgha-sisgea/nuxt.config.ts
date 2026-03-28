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
        'dayjs',
        'dayjs/locale/pt-br',
        'dayjs/plugin/customParseFormat',
        'dayjs/plugin/isBetween',
        'dayjs/plugin/updateLocale',
        'dayjs/plugin/weekOfYear',
        'lodash/groupBy',
        'lodash/map',
        'lodash/mapValues',
        'lodash/uniq',
        'lodash/filter',
        'lodash/uniqBy',
        'reka-ui',
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
