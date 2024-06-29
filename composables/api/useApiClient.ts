import { LadesaApiClient } from '@ladesa-ro/api-client-fetch';
import { inject, provide } from 'vue';

const API_AUTH_TOKEN = Symbol.for('API_AUTH_TOKEN');

export const getApiClient = () => {
  const ENPOINT_URL = 'https://luna.sisgha.com/api';

  const apiClient = new LadesaApiClient({
    BASE: ENPOINT_URL,
    CREDENTIALS: 'omit',
  });

  return apiClient;
};

export const setupApiClient = (shouldProvide = true) => {
  const apiClient = getApiClient();

  if (shouldProvide) {
    provide(API_AUTH_TOKEN, apiClient);
  }

  return apiClient;
};

export const useApiClient = () => {
  const apiClient = inject<LadesaApiClient>(
    API_AUTH_TOKEN,
    () => getApiClient(),
    true
  );

  return apiClient;
};
