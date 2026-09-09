export const useAuth = () => {
  const { data, status, lastRefreshedAt, sessionGeneration } = useAuthState();

  const clearAuthCookies = () =>
    $fetch('/api/auth/logout', { method: 'POST' }).catch(() => null);

  const getSession = async () => {
    const generation = sessionGeneration.value;

    try {
      const headers = import.meta.server ? useRequestHeaders(['cookie']) : {};

      const session = await $fetch('/api/auth/session', { headers });

      if (generation !== sessionGeneration.value) {
        await clearAuthCookies();
        return null;
      }

      data.value = session as AuthSessionData;
      status.value = session.user ? 'authenticated' : 'unauthenticated';
      lastRefreshedAt.value = new Date();

      return session;
    } catch {
      if (generation !== sessionGeneration.value) return null;

      data.value = null;
      status.value = 'unauthenticated';
      return null;
    }
  };

  const signIn = async (
    _provider: string,
    options: {
      redirect?: boolean;
      callbackUrl?: string;
      username?: string;
      password?: string;
    }
  ) => {
    status.value = 'loading';

    try {
      await $fetch('/api/auth/login', {
        method: 'POST',
        body: {
          matricula: options.username,
          senha: options.password,
        },
      });

      await getSession();

      return { error: null, url: options.callbackUrl || '/' };
    } catch (e: any) {
      status.value = 'unauthenticated';
      return {
        error: e?.data?.statusMessage || e?.message || 'Falha na autenticação',
        url: '',
      };
    }
  };

  const signOut = async (_options?: { redirect?: boolean }) => {
    sessionGeneration.value++;

    data.value = null;
    status.value = 'unauthenticated';

    await clearAuthCookies();
  };

  return {
    data,
    status,
    lastRefreshedAt,
    getSession,
    signIn,
    signOut,
  };
};
