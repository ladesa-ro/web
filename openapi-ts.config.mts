/** @type {import('@hey-api/openapi-ts').UserConfig} */

export default {
  base: '#',

  client: 'legacy/fetch',

  name: 'LadesaApiClient',

  services: {
    asClass: true,
  },

  schemas: { name: (name: any) => `$${name}` },

  input: 'https://dev.ladesa.com.br/api/v1/docs/openapi.v3.json',

  output: {
    lint: 'biome',
    format: 'biome',
    path: './api-client',
  },
};
