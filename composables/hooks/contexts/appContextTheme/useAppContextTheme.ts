import { APP_CONTEXT_THEME } from "./APP_CONTEXT_THEME";
import { IAppContextTheme } from "./createAppContextTheme";

export const useAppContextTheme = () => {
  const appContextTheme = inject<IAppContextTheme>(APP_CONTEXT_THEME);

  if (!appContextTheme) {
    throw new Error("APP_CONTEXT_THEME was not provided.");
  }

  return appContextTheme;
};
