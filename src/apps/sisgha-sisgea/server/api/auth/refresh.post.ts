export default defineEventHandler(async event => {
  const refreshToken = getCookie(event, AUTH_CONFIG.cookies.refreshToken);

  if (!refreshToken) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Refresh token não encontrado',
    });
  }

  try {
    const tokenResponse = await refreshAuthTokens(refreshToken);

    if (!tokenResponse.access_token) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Não foi possível renovar o token',
      });
    }

    setAuthCookies(event, tokenResponse);

    return { success: true };
  } catch (error: any) {
    if (error.statusCode) throw error;

    clearAuthCookies(event);

    throw createError({
      statusCode: 401,
      statusMessage: 'Não foi possível renovar o token',
    });
  }
});
