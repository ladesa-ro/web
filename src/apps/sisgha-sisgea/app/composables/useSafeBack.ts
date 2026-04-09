export const useSafeBack = () => {
  const router = useRouter();
  const route = useRoute();

  const goBack = (fallback = '/') => {
    const back = router.options.history.state.back;

    if (history.length <= 1 || !back || back === route.fullPath) {
      router.replace(fallback);
      return;
    }

    router.back();
  };

  return { goBack };
};
