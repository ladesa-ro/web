import type { LadesaApiClient } from '@ladesa-ro/api-client-fetch';

export const withApiClient = <T>(
  factory: (apiClient: LadesaApiClient) => T
) => {
  return factory;
};
