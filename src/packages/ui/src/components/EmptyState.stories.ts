import type { Meta, StoryObj } from '@storybook/vue3-vite';
import EmptyState from './EmptyState.vue';

const meta = {
  title: 'Componentes/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  args: { description: 'Nenhuma reserva encontrada.' },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ComIlustracao: Story = {};

export const ComTitulo: Story = {
  args: {
    title: 'Nenhum resultado encontrado.',
    description:
      'Tente ajustar seus termos ou filtros de pesquisa. Consultas mais amplas podem ajudar.',
  },
};

export const SemIlustracao: Story = {
  args: {
    illustration: 'none',
    title: 'Nenhum registro encontrado.',
    description: 'Não há registros cadastrados para exibir.',
  },
};
