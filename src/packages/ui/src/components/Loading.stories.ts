import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Loading from './Loading.vue';

const meta = {
  title: 'Componentes/Loading',
  component: Loading,
  tags: ['autodocs'],
  render: () => ({
    components: { Loading },
    template: '<div style="width: 12rem; height: 12rem"><Loading /></div>',
  }),
} satisfies Meta<typeof Loading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {};
