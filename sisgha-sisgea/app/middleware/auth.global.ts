export default defineNuxtRouteMiddleware(async (to) => {
  const { status, getSession } = useAuth();

  if (status.value === 'loading') {
    await getSession();
  }

  const authMeta = to.meta.auth as
    | false
    | { unauthenticatedOnly?: boolean; navigateAuthenticatedTo?: string }
    | undefined;

  if (authMeta === false) {
    return;
  }

  const isAuthenticated = status.value === 'authenticated';

  if (
    typeof authMeta === 'object' &&
    authMeta?.unauthenticatedOnly
  ) {
    if (isAuthenticated) {
      return navigateTo(authMeta.navigateAuthenticatedTo || '/');
    }
    return;
  }

  if (!isAuthenticated) {
    return navigateTo(
      `/login?callbackUrl=${encodeURIComponent(to.fullPath)}`
    );
  }
});
