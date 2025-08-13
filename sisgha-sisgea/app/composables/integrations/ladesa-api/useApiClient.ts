import {
  LadesaApiClient,
  type OpenAPIConfig,
} from '@ladesa-ro/management-service-client';

const API_AUTH_TOKEN = Symbol.for('API_AUTH_TOKEN');

export type ApiClient = ReturnType<typeof getApiClient>;

const getEndpointUrl = () => {
  return (
    process.env.NUXT_PUBLIC_ENPOINT_URL ?? 'https://dev.ladesa.com.br/api/v1'
  );
};

export const getApiClient = (config?: Partial<OpenAPIConfig>) => {
  const endpointUrl = getEndpointUrl();

  const apiClient = new LadesaApiClient({
    BASE: endpointUrl,
    ...config,
  });

  return apiClient;
};

export const setupApiClient = (shouldProvide = true) => {
  const { getAccessToken } = useAuthAccessToken();

  const options = {
    TOKEN: getAccessToken,
  } satisfies Partial<OpenAPIConfig>;

  const apiClient = getApiClient(options);

  if (shouldProvide) {
    provide(API_AUTH_TOKEN, apiClient);
  }

  return apiClient;
};

export const useApiClient = () => {
  const apiClient = inject<LadesaApiClient>(API_AUTH_TOKEN);

  if (!apiClient) {
    throw new Error('useApiClient: context not created');
  }

  return apiClient;
};
