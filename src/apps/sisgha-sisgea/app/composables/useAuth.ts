export const useAuth = () => {
  const { data, status, lastRefreshedAt } = useAuthState();

  const getSession = async () => {
    try {
      const headers = import.meta.server ? useRequestHeaders(['cookie']) : {};

      const session = await $fetch('/api/auth/session', { headers });

      data.value = session as AuthSessionData;
      status.value = session.user ? 'authenticated' : 'unauthenticated';
      lastRefreshedAt.value = new Date();

      return session;
    } catch {
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
    try {
      await $fetch('/api/auth/logout', { method: 'POST' });
    } catch {
      // Ignore errors on logout
    }

    data.value = null;
    status.value = 'unauthenticated';
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
