export default defineNuxtConfig({
  srcDir: "./src",

  // ==============================================

  ssr: true,

  // ===========

  typescript: {
    typeCheck: true,
  },

  // ===========

  devtools: {
    enabled: true,
  },

  // ===========

  features: {
    inlineStyles: true,
  },

  // ==============================================

  css: ["@mdi/font/css/materialdesignicons.min.css", "vuetify/lib/styles/main.css", "@/assets/styles/main.css"],

  build: {
    transpile: ["vuetify", "@ladesa-ro/web.components"],
  },

  serverHandlers: [{ route: "/_api/auth/**", handler: "~/server/_api/auth/[...].ts" }],

  // ==============================================

  modules: [
    "@sidebase/nuxt-auth",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "vue3-carousel-nuxt",
    "vuetify-nuxt-module",
    "@nuxtjs/critters",
  ],

  // https://github.com/nuxt-modules/critters?tab=readme-ov-file#options
  critters: {
    // Options passed directly to critters: https://github.com/GoogleChromeLabs/critters#critters-2
    config: {
      // Default: 'media'
      preload: "swap",
    },
  },

  tailwindcss: {
    configPath: "../../tailwind.config.mts",
  },

  // ==============================================

  colorMode: {
    preference: "system",
    classPrefix: "",
    classSuffix: "",
  },

  // ==============================================

  auth: {
    baseURL: process.env.AUTH_ORIGIN ?? "/_api/auth",

    provider: {
      type: "authjs",
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
      "rollup:before"(ctx) {
        ctx.options.moduleSideEffects.push("reflect-metadata");
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

  compatibilityDate: "2024-07-09",
});
