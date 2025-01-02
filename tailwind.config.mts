import type { Config } from 'tailwindcss';

export default {
  content: [],
  theme: {
    extend: {
      colors: {
        'ldsa-white': 'rgba(var(--ladesa-white-color), <alpha-value>)',
        'ldsa-black': 'rgba(var(--ladesa-black-color), <alpha-value>)',
        'ldsa-grey': 'rgba(var(--ladesa-grey-color), <alpha-value>)',
        'ldsa-green-1': 'rgba(var(--ladesa-green-1-color), <alpha-value>)',
        'ldsa-green-2': 'rgba(var(--ladesa-green-2-color), <alpha-value>)',
        'ldsa-red': 'rgba(var(--ladesa-red-color), <alpha-value>)',

        'ldsa-bg': 'rgb(var(--ladesa-background-color))',
        'ldsa-text-default': 'rgb(var(--ladesa-text-default-color))',
        'ldsa-text-green': 'rgb(var(--ladesa-text-green-color))',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
} satisfies Config;
