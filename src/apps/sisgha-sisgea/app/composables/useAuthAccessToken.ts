export const useAuthAccessToken = () => {
  const { data } = useAuth();

  const accessToken = computed(
    (): string | null => data.value?.accessToken ?? null
  );

  const getAccessToken = async () => {
    if (accessToken.value) {
      return accessToken.value;
    }

    return null;
  };

  return {
    accessToken,
    getAccessToken: getAccessToken as any,
  };
};
