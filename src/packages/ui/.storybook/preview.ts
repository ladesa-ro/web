import type { Preview } from '@storybook/vue3-vite';
import '@ladesa-ro/web.styles/index.css';

const applyTheme = (theme: unknown) => {
  const dark = theme === 'dark';

  document.documentElement.classList.toggle('dark', dark);
  document.body.classList.toggle('app-color-mode-dark', dark);
  document.body.classList.toggle('app-color-mode-light', !dark);
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/i },
    },
  },

  globalTypes: {
    theme: {
      description: 'Tema da aplicação',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Claro' },
          { value: 'dark', title: 'Escuro' },
        ],
        dynamicTitle: true,
      },
    },
  },

  initialGlobals: { theme: 'light' },

  decorators: [
    (story, context) => {
      applyTheme(context.globals.theme);
      return story();
    },
  ],
};

export default preview;
