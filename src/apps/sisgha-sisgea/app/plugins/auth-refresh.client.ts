import { AUTH_REFRESH_INTERVAL_MS } from '~/utils/constants';

export default defineNuxtPlugin(() => {
  const { getSession, status } = useAuth();

  const refreshIfAuthenticated = () => {
    if (status.value === 'authenticated') {
      getSession();
    }
  };

  const intervalId = setInterval(refreshIfAuthenticated, AUTH_REFRESH_INTERVAL_MS);

  window.addEventListener('focus', refreshIfAuthenticated);

  const nuxtApp = useNuxtApp();

  nuxtApp.hook('app:error', () => {
    clearInterval(intervalId);
    window.removeEventListener('focus', refreshIfAuthenticated);
  });
});
