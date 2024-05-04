import { SisgeaApiClient } from '@sisgea/api-client';
import { inject, provide } from 'vue';

const API_CLIENT_TOKEN = Symbol.for('SisgeaApiClient');

export const getApiClient = () => {
	const apiClient = new SisgeaApiClient({
		BASE: 'https://luna.sisgha.com/api',
		CREDENTIALS: 'omit',
	});

	return apiClient;
};

export const setupApiClient = (shouldProvide = true) => {
	const apiClient = getApiClient();

	if (shouldProvide) {
		provide(API_CLIENT_TOKEN, apiClient);
	}

	return apiClient;
};

export const useApiClient = () => {
	const apiClient = inject<SisgeaApiClient>(
		API_CLIENT_TOKEN,
		() => getApiClient(),
		true
	);

	return apiClient;
};
