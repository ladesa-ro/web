import { createVuetify } from 'vuetify';

export default defineNuxtPlugin(app => {
  const vuetify = createVuetify({
    theme: {},
  });
  app.vueApp.use(vuetify);
});
