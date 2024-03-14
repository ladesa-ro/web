import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
// import svgLoader from "vite-svg-loader";

export default defineNuxtConfig({

  serverHandlers: [
    { route: '/_api/auth/**', handler: '~/server/_api/auth/[...].ts' }
  ],

  //...
  css: [
    // ...
    "@mdi/font/css/materialdesignicons.min.css",
    "vuetify/lib/styles/main.css",
  ],

  build: {
    transpile: ["vuetify"],
  },
  auth: {
    baseURL: process.env.AUTH_ORIGIN ?? "/_api/auth",
    provider: {
      type: "authjs",
      trustHost: true,
    },
    session: {
      enableRefreshPeriodically: 15 * 1000,
      enableRefreshOnWindowFocus: true,
    },
  },
  modules: [
    "@sidebase/nuxt-auth",
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        config.plugins ||= [];
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
    //...
  ],

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

  vite: {
    // plugins: [svgLoader({})],

    // define: {
    //   "process.env.DEBUG": false,
    // },
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
});
