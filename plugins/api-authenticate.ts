import { OpenAPI as LadesaApiClientOpenAPI } from '@ladesa-ro/api-client-fetch';

export default defineNuxtPlugin({
  name: 'api-authenticate',
  enforce: 'pre',

  async setup(_nuxtApp) {},

  hooks: {
    'app:created'() {
      const { getAccessToken } = useAuthAccessToken();
      LadesaApiClientOpenAPI.TOKEN = getAccessToken;
    },
  },
  env: {
    // Set this value to `false` if you don't want the plugin to run when rendering server-only or island components.
    islands: true,
  },
});
