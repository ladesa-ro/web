import { useTheme } from 'vuetify';

export function useCustomTheme() {
  const colorMode = useColorMode();

  const theme = useTheme();

  const changeTheme = () => {
    colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark';
  };

  const isDark = computed(() => {
    return colorMode.value === 'dark';
  });

  watch(
    isDark,
    () => {
      if (isDark.value) theme.global.name.value = 'dark';
      else theme.global.name.value = 'light';
    },
    { immediate: true }
  );

  return { changeTheme, isDark };
}
