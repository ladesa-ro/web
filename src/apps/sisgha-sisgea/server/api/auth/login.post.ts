export default defineEventHandler(async event => {
  const { matricula, senha } = await readBody(event);

  if (!matricula || !senha) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Matricula e senha são obrigatórios',
    });
  }

  const apiBaseUrl = AUTH_CONFIG.apiBaseUrl();

  try {
    const tokenResponse = await $fetch<{
      access_token: string;
      refresh_token: string;
      expires_in: number;
    }>(`${apiBaseUrl}/autenticacao/login`, {
      method: 'POST',
      body: { matricula, senha },
    });

    if (!tokenResponse.access_token) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Credenciais inválidas',
      });
    }

    setAuthCookies(event, tokenResponse);

    return { success: true };
  } catch (error: any) {
    if (error.statusCode) throw error;

    throw createError({
      statusCode: 401,
      statusMessage: 'Não foi possível realizar o login',
    });
  }
});
