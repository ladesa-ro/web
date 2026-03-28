import { decodeJwt } from 'jose';

const NULL_SESSION = {
  user: null,
  accessToken: null,
  accessTokenExpires: null,
};

export default defineEventHandler(async event => {
  let accessToken = getCookie(event, AUTH_CONFIG.cookies.accessToken) ?? null;
  const refreshToken =
    getCookie(event, AUTH_CONFIG.cookies.refreshToken) ?? null;

  if (!accessToken && !refreshToken) {
    return NULL_SESSION;
  }

  let payload: Record<string, any> | null = null;

  if (accessToken) {
    try {
      payload = decodeJwt(accessToken);

      const exp = payload.exp ? payload.exp * 1000 : 0;

      if (exp - Date.now() < AUTH_CONFIG.refreshThresholdMs && refreshToken) {
        try {
          const tokens = await refreshAuthTokens(refreshToken);
          accessToken = tokens.access_token;
          payload = decodeJwt(accessToken);
          setAuthCookies(event, tokens);
        } catch {
          // Keep current token
        }
      }
    } catch {
      accessToken = null;
      payload = null;
    }
  }

  if (!accessToken && refreshToken) {
    try {
      const tokens = await refreshAuthTokens(refreshToken);
      accessToken = tokens.access_token;
      payload = decodeJwt(accessToken);
      setAuthCookies(event, tokens);
    } catch {
      clearAuthCookies(event);
      return NULL_SESSION;
    }
  }

  if (!payload || !accessToken) {
    return NULL_SESSION;
  }

  return {
    user: { id: payload.sub },
    accessToken,
    accessTokenExpires: payload.exp ? payload.exp * 1000 : null,
  };
});
