import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import IconCalendar from '../icons/Calendar/Calendar.vue';
import IconClock from '../icons/Clock.vue';
import IconHome from '../icons/Home.vue';
import IconUsers from '../icons/Users.vue';
import Sidebar from './Sidebar.vue';
import type { SidebarItemModel } from './sidebar-item';

const items: SidebarItemModel[] = [
  { type: 'link', title: 'Início', icon: IconHome, to: '/' },
  {
    type: 'group',
    title: 'Horário',
    icon: IconClock,
    items: [
      { type: 'link', title: 'Visualizar', icon: IconClock, to: '/horario' },
      { type: 'link', title: 'Gerar', icon: IconClock, to: '/horario/gerar' },
    ],
  },
  { type: 'link', title: 'Calendário', icon: IconCalendar, to: '/calendario' },
  { type: 'spacer' },
  { type: 'link', title: 'Usuários', icon: IconUsers, to: '/usuarios' },
];

const meta = {
  title: 'Componentes/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  args: { items, modelValue: true },
  render: args => ({
    components: { Sidebar },
    setup() {
      const aberta = ref(args.modelValue);
      return { args, aberta };
    },
    template:
      '<div style="height: 30rem; position: relative"><Sidebar v-bind="args" v-model="aberta" /></div>',
  }),
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Aberta: Story = {};
export const Fechada: Story = { args: { modelValue: false } };
export const SomenteLinks: Story = {
  args: { items: items.filter(item => item.type === 'link') },
};
