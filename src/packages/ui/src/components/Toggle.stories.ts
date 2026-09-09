import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import Toggle from './Toggle.vue';

const items = [
  { text: 'Professor', value: 'professor' },
  { text: 'Turma', value: 'turma' },
  { text: 'Mesclado', value: 'mesclado' },
];

const meta = {
  title: 'Componentes/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  args: { items, modelValue: 'professor' },
  render: args => ({
    components: { Toggle },
    setup() {
      const selecionado = ref(args.modelValue);
      return { args, selecionado };
    },
    template: '<Toggle v-bind="args" v-model="selecionado" />',
  }),
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {};
export const Desabilitado: Story = { args: { disabled: true } };
export const DuasOpcoes: Story = { args: { items: items.slice(0, 2) } };
