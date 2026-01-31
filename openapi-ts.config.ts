import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: './openapi/openapi-input.json', // sign up at app.heyapi.dev
  output: './openapi/openapi-output',
});
