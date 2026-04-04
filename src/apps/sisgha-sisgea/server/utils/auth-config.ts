import { getEndpointUrl } from "../../shared/options/get-endpoint-url";

export const AUTH_CONFIG = {
  apiBaseUrl: () => getEndpointUrl(),

  cookies: {
    accessToken: 'auth_token',
    refreshToken: 'auth_refresh_token',
  },

  refreshThresholdMs: 5 * 60 * 1000,
} as const;
