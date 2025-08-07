import { useTheme } from 'vuetify';

export function useCustomTheme() {
  const nuxtColorMode = useColorMode();

  const vuetifyTheme = useTheme();

  const changeTheme = () => {
    nuxtColorMode.preference = nuxtColorMode.preference === 'dark' ? 'light' : 'dark';
  };

  const isDark = computed(() => {
    return nuxtColorMode.value === 'dark';
  });

  watch(
    isDark,
    () => {
      vuetifyTheme.change(isDark.value ? 'dark' : 'light');
    },
    { immediate: true }
  );

  return { changeTheme, isDark };
}
