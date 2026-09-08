import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import FormRadioGroup from './FormRadioGroup.vue';

const meta = {
  title: 'Componentes/FormRadioGroup',
  component: FormRadioGroup,
  tags: ['autodocs'],
  args: {
    modelValue: 'presencial',
    label: 'Modalidade',
    items: [
      { label: 'Presencial', value: 'presencial' },
      { label: 'EAD', value: 'ead' },
      { label: 'Híbrido', value: 'hibrido', disabled: true },
    ],
  },
  render: args => ({
    components: { FormRadioGroup },
    setup() {
      const selecionado = ref('presencial');
      return { args, selecionado };
    },
    template: '<FormRadioGroup v-bind="args" v-model="selecionado" />',
  }),
} satisfies Meta<typeof FormRadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {};
export const Desabilitado: Story = { args: { disabled: true } };
