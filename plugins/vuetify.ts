import { createVuetify } from "vuetify";
import * as directives from "vuetify/directives";
import { pt } from "vuetify/locale";

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    theme: {
      defaultTheme: "dark",
    },

    ssr: true,

    directives,

    locale: {
      locale: "pt",
      messages: { pt },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
