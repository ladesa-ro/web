import type { Config } from 'tailwindcss';

export default {
  content: [],
  theme: {
    extend: {
      colors: {
        'ldsa-green-1': 'rgba(var(--ladesa-green-1-color), <alpha-value>)',
        'ldsa-green-2': 'rgba(var(--ladesa-green-2-color), <alpha-value>)',
        'ldsa-grey': 'rgba(var(--ladesa-grey-color), <alpha-value>)',
        'ldsa-grey-2': 'rgba(var(--ladesa-grey-2-color), <alpha-value>)',
        'ldsa-red': 'rgba(var(--ladesa-red-color), <alpha-value>)',
        'ldsa-purple': 'rgba(var(--ladesa-purple-color), <alpha-value>)',

        'ldsa-bg': 'rgb(var(--ladesa-background-color))',
        'ldsa-text': 'rgb(var(--ladesa-text-default-color))'
      },
    },
  },
  plugins: [],
  darkMode: 'class',
} satisfies Config;
