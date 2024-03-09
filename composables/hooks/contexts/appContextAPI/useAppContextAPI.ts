import { APP_CONTEXT_API } from "./APP_CONTEXT_API";
import { IAppContextAPI } from "./createAppContextAPI";

export const useAppContextAPI = () => {
  const appContextAPI = inject<IAppContextAPI>(APP_CONTEXT_API);

  if (!appContextAPI) {
    throw new Error("APP_CONTEXT_API was not provided.");
  }

  return appContextAPI;
};
