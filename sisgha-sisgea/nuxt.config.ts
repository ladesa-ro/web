import tailwindcss from '@tailwindcss/vite';
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';

export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },

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
    plugins: [tailwindcss()],
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },

  // ===========

  features: {
    inlineStyles: false,
  },

  // ==============================================

  css: ['@mdi/font/css/materialdesignicons.min.css', '~/assets/styles/app.css'],

  build: {
    transpile: ['vuetify'],
  },

  serverHandlers: [
    { route: '/api/nuxt/auth/**', handler: './server/api/nuxt/auth/[...].ts' },
  ],

  // ==============================================

  modules: [
    '@sidebase/nuxt-auth',
    '@nuxtjs/color-mode',
    'vue3-carousel-nuxt',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        config.plugins ??= [];
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
    '@nuxt/eslint',
  ],

  colorMode: {
    preference: 'system',
    fallback: 'light',
    classPrefix: '',
    classSuffix: '',
  },

  // ==============================================

  auth: {
    baseURL: process.env.AUTH_ORIGIN ?? '/api/nuxt/auth',

    provider: {
      type: 'authjs',
      trustHost: false,
      addDefaultCallbackUrl: false,
    },

    sessionRefresh: {
      enablePeriodically: 15 * 1000,
      enableOnWindowFocus: true,
    },

    globalAppMiddleware: true,
  },

  // ===========

  // ===========
  nitro: {
    hooks: {
      'rollup:before'(ctx) {
        ctx.options.moduleSideEffects.push('reflect-metadata');
      },
    },
    esbuild: {
      options: {
        tsconfigRaw: {
          compilerOptions: {
            experimentalDecorators: true,
          },
        },
      },
    },
  },

  compatibilityDate: '2024-11-01',
});
