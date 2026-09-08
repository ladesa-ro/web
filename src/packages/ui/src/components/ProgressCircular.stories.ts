import type { Meta, StoryObj } from '@storybook/vue3-vite';
import ProgressCircular from './ProgressCircular.vue';

const meta = {
  title: 'Componentes/ProgressCircular',
  component: ProgressCircular,
  tags: ['autodocs'],
} satisfies Meta<typeof ProgressCircular>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {};
export const Pequeno: Story = { args: { size: '2rem' } };
export const Grande: Story = { args: { size: '8rem' } };
