import Calendario from '~/components/Icons/Calendar/Calendar.vue';
import Home from '~/components/Icons/Home.vue';
import Logout from '~/components/Icons/Logout.vue';
import User from '~/components/Icons/User.vue';
import type { ISidebarItem } from '~/components/Sidebar/SidebarItem/ISidebarItem';

const CAMINHO_PROFESSOR: string = '/sisgha/professor';

export const useLayoutsDashboardSisghaProfessorSidebarItems = () => {
  const items: ISidebarItem[] = [
    {
      type: 'link',
      title: 'Início',
      icon: Home,
      to: `${CAMINHO_PROFESSOR}/`,
      exact: true,
    },

    {
      type: 'link',
      title: 'Calendário',
      icon: Calendario,
      to: `${CAMINHO_PROFESSOR}/calendario`,
      exact: false,
    },

    { type: 'spacer' },

    {
      type: 'link',
      title: 'Perfil',
      icon: User,
      to: `${CAMINHO_PROFESSOR}/perfil`,
      exact: false,
    },

    {
      type: 'link',
      title: 'Sair',
      icon: Logout,
      to: '/logout',
      exact: false,
    },
  ];

  return { items };
};
