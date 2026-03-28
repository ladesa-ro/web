export const AUTH_CONFIG = {
  apiBaseUrl: () =>
    process.env.NUXT_PUBLIC_ENPOINT_URL ?? 'https://dev.ladesa.com.br/api/v1',

  cookies: {
    accessToken: 'auth_token',
    refreshToken: 'auth_refresh_token',
  },

  refreshThresholdMs: 5 * 60 * 1000,
} as const;
