import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Alert from './Alert.vue';

const meta = {
  title: 'Componentes/Alert',
  component: Alert,
  tags: ['autodocs'],
  args: { type: 'info', message: 'Mensagem informativa' },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {};
export const Sucesso: Story = {
  args: { type: 'success', message: 'Operação concluída' },
};
export const Aviso: Story = {
  args: { type: 'warning', message: 'Confira antes de continuar' },
};
export const Erro: Story = {
  args: { type: 'error', message: 'Não foi possível salvar' },
};
