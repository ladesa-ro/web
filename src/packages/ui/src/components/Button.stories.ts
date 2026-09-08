import type { Meta, StoryObj } from '@storybook/vue3-vite';
import Button from './Button.vue';

const meta = {
  title: 'Componentes/Button',
  component: Button,
  tags: ['autodocs'],
  args: { outlineOnClick: true },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
  render: args => ({
    components: { Button },
    setup: () => ({ args }),
    template: '<Button v-bind="args">Entrar</Button>',
  }),
};

export const SemOutline: Story = {
  ...Padrao,
  args: { outlineOnClick: false },
};

export const Desabilitado: Story = {
  render: args => ({
    components: { Button },
    setup: () => ({ args }),
    template: '<Button v-bind="args" disabled>Indisponível</Button>',
  }),
};

export const ComIcones: Story = {
  render: args => ({
    components: { Button },
    setup: () => ({ args }),
    template: `
      <Button v-bind="args">
        <template #start-icon><span>&laquo;</span></template>
        Com ícones
        <template #end-icon><span>&raquo;</span></template>
      </Button>
    `,
  }),
};
