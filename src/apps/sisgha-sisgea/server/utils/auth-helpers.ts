import type { H3Event } from 'h3';

interface TokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export async function refreshAuthTokens(
  refreshToken: string
): Promise<TokenResponse> {
  const apiBaseUrl = AUTH_CONFIG.apiBaseUrl();

  return await $fetch<TokenResponse>(
    `${apiBaseUrl}/autenticacao/login/refresh`,
    {
      method: 'POST',
      body: { refreshToken },
    }
  );
}

export function setAuthCookies(event: H3Event, tokens: TokenResponse) {
  const isSecure = !import.meta.dev;

  setCookie(event, AUTH_CONFIG.cookies.accessToken, tokens.access_token, {
    maxAge: tokens.expires_in,
    path: '/',
    sameSite: 'lax',
    secure: isSecure,
    httpOnly: false,
  });

  setCookie(event, AUTH_CONFIG.cookies.refreshToken, tokens.refresh_token, {
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
    sameSite: 'lax',
    secure: isSecure,
    httpOnly: true,
  });
}

export function clearAuthCookies(event: H3Event) {
  deleteCookie(event, AUTH_CONFIG.cookies.accessToken, { path: '/' });
  deleteCookie(event, AUTH_CONFIG.cookies.refreshToken, { path: '/' });
}
