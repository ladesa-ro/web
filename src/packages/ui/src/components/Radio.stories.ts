import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import Radio from './Radio.vue';

const meta = {
  title: 'Componentes/Radio',
  component: Radio,
  tags: ['autodocs'],
  args: {
    items: [
      { label: 'Matutino', value: 'matutino' },
      { label: 'Vespertino', value: 'vespertino' },
      { label: 'Noturno', value: 'noturno' },
    ],
  },
  render: args => ({
    components: { Radio },
    setup() {
      const selecionado = ref('matutino');
      return { args, selecionado };
    },
    template: '<Radio v-bind="args" v-model="selecionado" />',
  }),
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {};
