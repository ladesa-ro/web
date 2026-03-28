export default defineNuxtPlugin(() => {
  const { getSession, status } = useAuth();

  const refreshIfAuthenticated = () => {
    if (status.value === 'authenticated') {
      getSession();
    }
  };

  const intervalId = setInterval(refreshIfAuthenticated, 15_000);

  window.addEventListener('focus', refreshIfAuthenticated);

  const nuxtApp = useNuxtApp();

  nuxtApp.hook('app:error', () => {
    clearInterval(intervalId);
    window.removeEventListener('focus', refreshIfAuthenticated);
  });
});
