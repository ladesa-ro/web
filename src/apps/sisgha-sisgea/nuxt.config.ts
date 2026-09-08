import { fileURLToPath, URL } from 'node:url';

const DEFAULT_DEV_PUBLIC = 'https://dev.ladesa.com.br/api/v1';
const DEFAULT_DEV_LOCAL = 'http://localhost:3701/api';

const useLocal = false;

const fallback = useLocal ? DEFAULT_DEV_LOCAL : DEFAULT_DEV_PUBLIC;

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      API: process.env.NUXT_PUBLIC_ENPOINT_URL ?? fallback,
    },
  },

  experimental: {
    normalizeComponentNames: true,
  },

  srcDir: './app',

  ssr: true,

  css: ['@ladesa-ro/web.styles/index.css', '~/assets/styles/app.css'],

  imports: {
    dirs: ['composables/ladesa-api', 'composables/query-helpers'],
  },

  typescript: {
    typeCheck: true,
  },

  eslint: {},

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
        'reka-ui',
        'vee-validate',
        'yup',
        '@vueuse/core',
        'vue3-dropzone',
        'dayjs',
        'dayjs/locale/pt-br',
        'dayjs/plugin/customParseFormat',
        'dayjs/plugin/isBetween',
        'dayjs/plugin/updateLocale',
        'dayjs/plugin/weekOfYear',
        'lodash-es',
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

  features: {
    inlineStyles: true,
  },

  modules: [
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    'vue3-carousel-nuxt',
    '@nuxt/eslint',
  ],

  colorMode: {
    preference: 'system',
    fallback: 'light',
    classPrefix: '',
    classSuffix: '',
    storage: 'cookie',
    storageKey: 'nuxt-color-mode',
  },

  routeRules: {
    '/': { redirect: '/sisgha/dape' },
    '/**': {
      headers: {
        'Accept-CH': 'Sec-CH-Prefers-Color-Scheme',
      },
    },
  },

  nitro: {},

  compatibilityDate: '2026-01-31',
});
