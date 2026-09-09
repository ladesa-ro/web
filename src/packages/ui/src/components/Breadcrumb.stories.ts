import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Breadcrumb from './Breadcrumb.vue';

const meta = {
  title: 'Componentes/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  args: {
    segments: [
      { title: 'Início', to: '/' },
      { title: 'Disciplinas', to: '/disciplinas' },
      { title: 'Física' },
    ],
  },
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {};
export const ComVoltar: Story = { args: { showGoBack: true } };
export const UmNivel: Story = { args: { segments: [{ title: 'Início' }] } };
