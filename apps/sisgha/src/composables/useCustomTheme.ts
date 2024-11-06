export function useCustomTheme() {
  const { $vuetify } = useNuxtApp();

  const colorMode = useColorMode();

  const changeTheme = () => {
    colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark';
  };

  const isDark = computed(() => {
    return colorMode.value === 'dark';
  });

  watch(
    isDark,
    () => {
      if (isDark.value) $vuetify.theme.global.name.value = 'dark';
      else $vuetify.theme.global.name.value = 'light';
    },
    { immediate: true }
  );

  return { changeTheme, isDark };
}
