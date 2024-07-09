import { callWithNuxt } from 'nuxt/app';
import { useAuthSignInCallbackUrl } from './useAuthSignInCallbackUrl';

export const useAuthSignIn = () => {
  const app = useNuxtApp();
  const { status } = useAuthState();

  const callbackUrlRef = useAuthSignInCallbackUrl();

  watch(
    [status, callbackUrlRef],
    ([status, callbackUrl]) => {
      if (status === 'authenticated') {
        callWithNuxt(app, () => navigateTo(callbackUrl, { external: true }));
      }
    },
    { immediate: true }
  );

  const { signIn } = useAuth();

  const credentials = reactive({
    username: '',
    password: '',
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

    const result = await signIn('credentials', {
      callbackUrl: unref(callbackUrlRef),
      redirect: false,
      username: credentials.username,
      password: credentials.password,
    });

    if (result) {
      const { error, url } = result;

      if (error) {
        isError.value = true;
        isLoading.value = false;
      } else {
        callWithNuxt(app, () => navigateTo(url, { external: true }));
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
