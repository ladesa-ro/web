import { useTheme } from "vuetify/lib/framework.mjs";

export type IAppContextTheme = Awaited<
  ReturnType<typeof createAppContextTheme>
>;

export const createAppContextTheme = async () => {
  const vuetifyTheme = useTheme();

  const colorMode = useColorMode();

  const currentTheme = computed(() => colorMode.value);

  const isDark = computed(() => colorMode.value === "dark");

  const invertTheme = () => {
    colorMode.preference = isDark.value ? "light" : "dark";
  };

  //

  const applyCurrentThemeToVuetify = () => {
    vuetifyTheme.global.name.value = currentTheme.value;
  };

  watch([currentTheme], applyCurrentThemeToVuetify);
  onMounted(applyCurrentThemeToVuetify);

  //

  return {
    isDark,
    currentTheme,
    invertTheme,
  };
};
