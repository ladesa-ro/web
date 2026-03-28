import tailwindcss from '@tailwindcss/vite';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const currentDir = dirname(fileURLToPath(import.meta.url));

export default defineNuxtConfig({
  css: [join(currentDir, './app/assets/styles/app.css')],

  vite: {
    plugins: [tailwindcss()],
  },

  compatibilityDate: '2025-03-27',
});
