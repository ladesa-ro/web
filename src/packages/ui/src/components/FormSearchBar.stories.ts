import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import FormSearchBar from './FormSearchBar.vue';

const meta = {
  title: 'Componentes/FormSearchBar',
  component: FormSearchBar,
  tags: ['autodocs'],
  render: () => ({
    components: { FormSearchBar },
    setup() {
      const termo = ref('');
      return { termo };
    },
    template:
      '<div style="width: 20rem"><FormSearchBar v-model="termo" /></div>',
  }),
} satisfies Meta<typeof FormSearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Vazia: Story = {};
