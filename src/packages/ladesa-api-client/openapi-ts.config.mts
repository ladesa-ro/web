import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: './openapi-spec.json',

  output: {
    path: './src/__generated__',
    clean: true,
  },

  plugins: [
    {
      name: '@hey-api/client-fetch',
      baseUrl: false,
    },
    {
      name: '@hey-api/typescript',
      identifierCase: 'preserve',
    },
    {
      name: '@hey-api/sdk',
    },
  ],
});
