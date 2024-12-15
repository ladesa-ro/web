import type { Config } from 'tailwindcss';

export default {
  content: [],
  theme: {
    extend: {
      colors: {
        'ldsa-bg': 'rgb(var(--ladesa-background-color))',
        'ldsa-green-1': 'rgb(var(--ladesa-text-green-1-color))',
        'ldsa-green-2': 'rgb(var(--ladesa-text-green-2-color))',
        'ldsa-green-3': 'rgb(var(--ladesa-border-color-green-3))',
        'ldsa-grey': 'rgba(var(--ladesa-border-color-grey), 0.7)',
        'ldsa-text-default': 'rgb(var(--ladesa-text-default-color))'
      }
    }
  },
  plugins: [],
  darkMode: 'class',
} satisfies Config;
