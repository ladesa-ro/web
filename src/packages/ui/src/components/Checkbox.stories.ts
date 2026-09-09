import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import Checkbox from './Checkbox.vue';

const items = [
  { label: 'Segunda', value: 'seg' },
  { label: 'Terça', value: 'ter' },
  { label: 'Quarta', value: 'qua' },
];

const meta = {
  title: 'Componentes/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  args: { items },
  render: args => ({
    components: { Checkbox },
    setup() {
      const marcados = ref<string[]>(['seg']);
      return { args, marcados };
    },
    template: '<Checkbox v-bind="args" v-model="marcados" />',
  }),
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {};
export const ComItemDesabilitado: Story = { args: { disabledItems: ['qua'] } };
