import { callWithNuxt } from "nuxt/app";
import { useAuthSignInCallbackUrl } from "./useAuthSignInCallbackUrl";

export const useAuthSignIn = () => {
  const app = useNuxtApp();
  const { status } = useAuthState();

  const callbackUrlRef = useAuthSignInCallbackUrl();

  const redirect = (url: string) => {
    callWithNuxt(app as any, () => navigateTo(url, { external: true }));
  };

  watch(
    [status, callbackUrlRef],
    ([status, callback]) => {
      if (status === "authenticated") {
        redirect(callback);
      }
    },
    { immediate: true }
  );

  const { signIn } = useAuth();

  const credentials = reactive({
    username: "",
    password: "",
  });

  const isLoading = ref(false);
  const isError = ref(false);

  const isBusy = computed(() => unref(isLoading));

  const canSubmit = computed(() => !unref(isBusy));

  const signInWithCredentials = async () => {
    if (isLoading.value) {
      return;
    }

    isLoading.value = true;
    isError.value = false;

    const result = await signIn("credentials", {
      redirect: true,
      callbackUrl: unref(callbackUrlRef),
      username: credentials.username,
      password: credentials.password,
    });

    if (result) {
      const { error, url } = result;

      if (error) {
        isError.value = true;
        isLoading.value = false;
      } else {
        redirect(url);
      }
    }
  };

  return {
    isBusy,
    canSubmit,
    isLoading,
    isError,

    // ...

    credentials,

    //

    signInWithCredentials,
  };
};
