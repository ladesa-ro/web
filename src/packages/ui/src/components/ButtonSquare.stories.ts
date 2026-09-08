import type { Meta, StoryObj } from '@storybook/vue3-vite';
import ButtonAdd from './ButtonAdd.vue';
import ButtonArrow from './ButtonArrow.vue';
import ButtonEdit from './ButtonEdit.vue';
import ButtonEventsList from './ButtonEventsList.vue';
import ButtonSearch from './ButtonSearch.vue';

const meta = {
  title: 'Componentes/Botões quadrados',
  tags: ['autodocs'],
} satisfies Meta<unknown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Familia: Story = {
  render: () => ({
    components: {
      ButtonAdd,
      ButtonArrow,
      ButtonSearch,
      ButtonEdit,
      ButtonEventsList,
    },
    template: `
      <div style="display: flex; gap: 1rem; align-items: center">
        <ButtonAdd />
        <ButtonArrow />
        <ButtonSearch />
        <ButtonEdit />
        <ButtonEventsList />
      </div>
    `,
  }),
};
