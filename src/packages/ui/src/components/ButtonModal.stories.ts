import type { Meta, StoryObj } from '@storybook/vue3-vite';
import ButtonModalAdvance from './ButtonModalAdvance.vue';
import ButtonModalCancel from './ButtonModalCancel.vue';
import ButtonModalClearDanger from './ButtonModalClearDanger.vue';
import ButtonModalConfirm from './ButtonModalConfirm.vue';
import ButtonModalDelete from './ButtonModalDelete.vue';
import ButtonModalGoBack from './ButtonModalGoBack.vue';

const meta = {
  title: 'Componentes/Botões de modal',
  tags: ['autodocs'],
} satisfies Meta<unknown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Familia: Story = {
  render: () => ({
    components: {
      ButtonModalConfirm,
      ButtonModalCancel,
      ButtonModalAdvance,
      ButtonModalGoBack,
      ButtonModalDelete,
      ButtonModalClearDanger,
    },
    template: `
      <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap">
        <ButtonModalConfirm />
        <ButtonModalCancel />
        <ButtonModalAdvance />
        <ButtonModalGoBack />
        <ButtonModalDelete />
        <ButtonModalClearDanger text="Limpar" />
      </div>
    `,
  }),
};
