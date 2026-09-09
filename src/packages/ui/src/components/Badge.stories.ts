import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Badge from './Badge.vue';

const meta = {
  title: 'Componentes/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: { text: 'Ativo' },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Neutral: Story = { args: { text: 'Rascunho' } };
export const Sucesso: Story = { args: { variant: 'success', text: 'Ativo' } };
export const Perigo: Story = { args: { variant: 'danger', text: 'Inativo' } };
export const Aviso: Story = { args: { variant: 'warning', text: 'Pendente' } };
export const Info: Story = { args: { variant: 'info', text: 'Etapa' } };

export const Todos: Story = {
  render: () => ({
    components: { Badge },
    template: `
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap">
        <Badge>Neutro</Badge>
        <Badge variant="success">Ativo</Badge>
        <Badge variant="danger">Inativo</Badge>
        <Badge variant="warning">Rascunho</Badge>
        <Badge variant="info">Etapa</Badge>
      </div>
    `,
  }),
};
