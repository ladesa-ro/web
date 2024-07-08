import { OpenAPI as LadesaApiClientOpenAPI } from '@ladesa-ro/api-client-fetch';

export default defineNuxtPlugin({
  name: 'api-authenticate',
  enforce: 'pre',
  async setup(nuxtApp) {},
  hooks: {
    'app:created'() {
      const { data } = useAuthState();

      const getAccessToken = async () => {
        const accessToken = data.value?.accessToken;

        if (accessToken) {
          return accessToken;
        }

        return null;
      };

      LadesaApiClientOpenAPI.TOKEN = getAccessToken;
    },
  },
  env: {
    // Set this value to `false` if you don't want the plugin to run when rendering server-only or island components.
    islands: true,
  },
});
