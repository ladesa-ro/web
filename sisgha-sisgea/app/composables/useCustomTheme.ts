export function useCustomTheme() {
  const nuxtColorMode = useColorMode();

  const changeTheme = () => {
    nuxtColorMode.preference = nuxtColorMode.preference === 'dark' ? 'light' : 'dark';
  };

  const isDark = computed(() => {
    return nuxtColorMode.value === 'dark';
  });

  return { changeTheme, isDark };
}
