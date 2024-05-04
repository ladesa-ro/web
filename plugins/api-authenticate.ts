import { OpenAPI as SisgeaApiClientOpenAPI } from '@sisgea/api-client';
import { OpenAPI as DeprecatedInternalOpenAPI } from '../infrastructure/api/generated';

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

			SisgeaApiClientOpenAPI.TOKEN = getAccessToken;
			DeprecatedInternalOpenAPI.TOKEN = getAccessToken;
		},
	},
	env: {
		// Set this value to `false` if you don't want the plugin to run when rendering server-only or island components.
		islands: true,
	},
});
