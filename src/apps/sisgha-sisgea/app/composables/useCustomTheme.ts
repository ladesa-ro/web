export function useCustomTheme() {
  const colorMode = useColorMode();
  const colorModeCookie = useCookie('nuxt-color-mode');

  const headers = import.meta.server
    ? useRequestHeaders(['sec-ch-prefers-color-scheme'])
    : null;

  const clientHint = headers?.['sec-ch-prefers-color-scheme'];

  const isDark = computed(() => {
    if (import.meta.server) {
      const stored = colorModeCookie.value;

      if (stored && stored !== 'system') {
        return stored === 'dark';
      }

      return clientHint === 'dark';
    }

    return colorMode.value === 'dark';
  });

  const changeTheme = () => {
    colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark';
  };

  return { changeTheme, isDark };
}
