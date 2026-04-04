export const getEndpointUrl = () => {
  return (
    process.env.NUXT_PUBLIC_ENPOINT_URL ?? 'https://dev.ladesa.com.br/api/v1'
  );
};