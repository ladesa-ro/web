import type { Meta, StoryObj } from '@storybook/vue3-vite';
import CardSkeleton from './CardSkeleton.vue';

const meta = {
  title: 'Componentes/CardSkeleton',
  component: CardSkeleton,
  tags: ['autodocs'],
  render: () => ({
    components: { CardSkeleton },
    template: '<div style="width: 18rem"><CardSkeleton /></div>',
  }),
} satisfies Meta<typeof CardSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Carregando: Story = {};
