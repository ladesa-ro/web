import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'node:url';

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

    resolve: {
      alias: {
        '~': fileURLToPath(new URL('./app', import.meta.url)),
        '@': fileURLToPath(new URL('./app', import.meta.url)),
      },
    },
  },

  // ===========

  features: {
    inlineStyles: true,
  },

  // ==============================================

  css: ['~/assets/styles/app.css'],

  serverHandlers: [
    { route: '/api/nuxt/auth/**', handler: './server/api/nuxt/auth/[...].ts' },
  ],

  // ==============================================

  modules: [
    '@sidebase/nuxt-auth',
    '@nuxtjs/color-mode',
    'vue3-carousel-nuxt',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', config => {
        config.plugins ??= [];
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
