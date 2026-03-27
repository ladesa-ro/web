import {
  IconsCalendar,
  IconsHome,
  IconsLogout,
  IconsUser,
} from '#components';
import type { ISidebarItem } from '~/components/Sidebar/SidebarItem/ISidebarItem';

const CAMINHO_PROFESSOR: string = '/sisgha/professor';

export const useLayoutsDashboardSisghaProfessorSidebarItems = () => {
  const items: ISidebarItem[] = [
    {
      type: 'link',
      title: 'Início',
      icon: IconsHome,
      to: `${CAMINHO_PROFESSOR}/`,
      exact: true,
    },

    {
      type: 'link',
      title: 'Calendário',
      icon: IconsCalendar,
      to: `${CAMINHO_PROFESSOR}/calendario`,
      exact: false,
    },

    { type: 'spacer' },

    {
      type: 'link',
      title: 'Perfil',
      icon: IconsUser,
      to: `${CAMINHO_PROFESSOR}/perfil`,
      exact: false,
    },

    {
      type: 'link',
      title: 'Sair',
      icon: IconsLogout,
      to: '/logout',
      exact: false,
    },
  ];

  return { items };
};
