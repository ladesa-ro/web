export const useAuthAccessToken = () => {
  const { data } = useAuth();

  const accessToken = computed(
    (): string | undefined => data.value?.accessToken ?? undefined
  );

  const getAccessToken = async (): Promise<string | undefined> => {
    if (accessToken.value) {
      return accessToken.value;
    }

    return undefined;
  };

  return {
    accessToken,
    getAccessToken,
  };
};
