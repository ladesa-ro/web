import type { Config } from 'tailwindcss';

export default {
  content: [],
  theme: {
    extend: {
      colors: {
        'lovely-green': '#57ed57',
        'ladesa-card': 'rgb(var(--ladesa-card))',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
} satisfies Config;
