// import { fileURLToPath, URL } from "node:url";

// import vue from "@vitejs/plugin-vue";
// import { resolve } from "node:path";
// import { defineConfig } from "vite";
// import vueDevTools from "vite-plugin-vue-devtools";

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [vue(), vueDevTools()],
//   resolve: {
//     alias: {
//       "@": fileURLToPath(new URL("./src", import.meta.url)),
//     },
//   },
//   build: {
//     lib: {
//       // src/indext.ts is where we have exported the component(s)
//       entry: resolve(__dirname, "src/index.ts"),
//       name: "LadesaUi",
//       // the name of the output files when the build is run
//       fileName: "ladesa-ui-lib",
//     },
//     rollupOptions: {
//       // make sure to externalize deps that shouldn't be bundled
//       // into your library
//       external: ["vue"],
//       output: {
//         // Provide global variables to use in the UMD build
//         // for externalized deps
//         globals: {
//           vue: "Vue",
//         },
//       },
//     },
//   },
// });

import vue from "@vitejs/plugin-vue";
import { resolve } from "node:path";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import vueDevTools from "vite-plugin-vue-devtools";

const SRC_INDEX = resolve(__dirname, "src/index.ts");

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),

    dts({
      entryRoot: "./src",
      outputDir: ["./dist/es", "./dist/cjs"],
      tsConfigFilePath: "./tsconfig.json",
      
    }),

    vueDevTools(),
  ],

  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },

  build: {
    minify: false,

    cssCodeSplit: false,

    lib: {
      entry: SRC_INDEX,
    },

    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["vue"],

      input: SRC_INDEX,
      

      output: [
        {
          format: "es",
          entryFileNames: "[name].mjs",
          preserveModules: true,
          exports: "named",
          dir: "./dist/es",
          
        },
        {
          format: "cjs",
          entryFileNames: "[name].js",
          preserveModules: true,
          exports: "named",
          dir: "./dist/cjs",
        },
      ],
    },
  },
});
