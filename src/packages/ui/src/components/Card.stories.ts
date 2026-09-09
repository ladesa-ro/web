import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Card from './Card.vue';

const meta = {
  title: 'Componentes/Card',
  component: Card,
  tags: ['autodocs'],
  args: { variant: 'block', src: null, title: 'Física' },
  render: args => ({
    components: { Card },
    setup: () => ({ args }),
    template:
      '<div style="width: 18rem"><Card v-bind="args">Carga horária: 60 horas</Card></div>',
  }),
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SemImagem: Story = {};

export const TituloLongo: Story = {
  args: { title: 'Sistemas Operacionais e Arquitetura de Computadores' },
};
