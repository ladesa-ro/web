export const AUTH_CONFIG = {
  apiBaseUrl: () => {
    const config = useRuntimeConfig();
    return config.public.API as string;
  },

  cookies: {
    accessToken: 'auth_token',
    refreshToken: 'auth_refresh_token',
  },

  refreshThresholdMs: 5 * 60 * 1000,
} as const;
