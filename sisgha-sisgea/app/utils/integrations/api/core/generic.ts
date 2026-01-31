import type { LadesaApiClient } from '~/helpers/api-client';

export const withApiClient = <T>(
  factory: (apiClient: LadesaApiClient) => T
) => {
  return factory;
};
