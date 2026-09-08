import type { Meta, StoryObj } from '@storybook/vue3-vite';
import CardLine from './CardLine.vue';

const meta = {
  title: 'Componentes/CardLine',
  component: CardLine,
  tags: ['autodocs'],
  args: { text: 'Carga horária: 60 horas' },
} satisfies Meta<typeof CardLine>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ComTexto: Story = {};

export const TextoLongoTruncado: Story = {
  args: {
    text: 'Formação: ' + 'Bacharelado em Sistemas de Informação '.repeat(4),
  },
};
