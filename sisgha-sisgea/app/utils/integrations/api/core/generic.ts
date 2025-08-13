import type { LadesaApiClient } from '@ladesa-ro/management-service-client';

export const withApiClient = <T>(
  factory: (apiClient: LadesaApiClient) => T
) => {
  return factory;
};
