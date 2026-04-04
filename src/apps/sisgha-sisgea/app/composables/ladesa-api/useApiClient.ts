import {
  createLadesaApi,
  type LadesaApi,
  type LadesaApiClientConfig,
} from '@ladesa-ro/web.api.client';
import { getEndpointUrl } from '../../options/get-endpoint-url';

const API_AUTH_TOKEN = Symbol.for('API_AUTH_TOKEN');

export type ApiClient = LadesaApi;


export const getApiClient = (config?: Partial<LadesaApiClientConfig>) => {
  const endpointUrl = getEndpointUrl();

  return createLadesaApi({
    BASE: endpointUrl,
    ...config,
  });
};

export const setupApiClient = (shouldProvide = true) => {
  const { getAccessToken } = useAuthAccessToken();

  const options = {
    TOKEN: getAccessToken,
  } satisfies Partial<LadesaApiClientConfig>;

  const apiClient = getApiClient(options);

  if (shouldProvide) {
    provide(API_AUTH_TOKEN, apiClient);
  }

  return apiClient;
};

export const useApiClient = () => {
  const apiClient = inject<LadesaApi>(API_AUTH_TOKEN);

  if (!apiClient) {
    throw new Error('useApiClient: context not created');
  }

  return apiClient;
};
