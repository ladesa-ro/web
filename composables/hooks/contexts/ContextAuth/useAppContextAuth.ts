import { APP_CONTEXT_AUTH } from "./APP_CONTEXT_AUTH";
import { IAppContextAuth } from "./createAppContextAuth";

export const useAppContextAuth = () => {
  const appContextAuth = inject<IAppContextAuth>(APP_CONTEXT_AUTH);

  if (!appContextAuth) {
    throw new Error("APP_CONTEXT_AUTH not provied");
  }

  return appContextAuth;
};
