export const getEndpointUrl = () => {
  const config = useRuntimeConfig();
  return config.public.API as string;
};