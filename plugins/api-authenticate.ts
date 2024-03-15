import { OpenAPI } from "../infrastructure/api/generated";

export default defineNuxtPlugin({
  name: "api-authenticate",
  enforce: "pre", // or 'post'
  async setup(nuxtApp) {
    // this is the equivalent of a normal functional plugin
  },
  hooks: {
    // You can directly register Nuxt app runtime hooks here
    "app:created"() {
      const { data } = useAuthState();

      OpenAPI.TOKEN = async () => {
        const accessToken = data.value?.accessToken;

        if (accessToken) {
          return accessToken;
        }

        return null;
      };
      // do something in the hook
    },
  },
  env: {
    // Set this value to `false` if you don't want the plugin to run when rendering server-only or island components.
    islands: true,
  },
});
