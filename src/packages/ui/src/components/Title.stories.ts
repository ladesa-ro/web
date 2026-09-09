import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Title from './Title.vue';

const meta = {
  title: 'Componentes/Title',
  component: Title,
  tags: ['autodocs'],
  args: { text: 'Título da seção' },
} satisfies Meta<typeof Title>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Small: Story = { args: { variant: 'small' } };
export const Mini: Story = { args: { variant: 'mini' } };
