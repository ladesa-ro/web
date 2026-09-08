import type { Preview } from '@storybook/vue3-vite';
import '@ladesa-ro/web.styles/index.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/i },
    },
  },
};

export default preview;
