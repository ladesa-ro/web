export const useAuthSignInCallbackUrl = () => {
  const route = useRoute();

  const callbackUrlParamRef = computed(() => route.query.callbackUrl);

  const callbackUrlRef = computed(() => {
    const callbackUrlParam = unref(callbackUrlParamRef);
    return typeof callbackUrlParam === "string" ? callbackUrlParam : "/";
  });

  return callbackUrlRef;
};
