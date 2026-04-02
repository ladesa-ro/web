import {
  IconsBlocks,
  IconsEnvironment,
  IconsLogout,
  IconsReserve,
  IconsSchool,
  IconsUser,
} from '#components';

import type { ISidebarItem } from '~/components/Sidebar/SidebarItem/ISidebarItem';

export const useLayoutsDashboardSisgeaCommonSidebarItems = () => {
  const items: ISidebarItem[] = [
    {
      type: 'link',
      title: 'Reservas',
      icon: IconsReserve,
      to: '/sisgea/reservas',
      exact: false,
    },
    {
      type: 'link',
      title: 'Ambientes',
      icon: IconsEnvironment,
      to: '/sisgea/ambientes',
      exact: false,
    },
    {
      type: 'link',
      title: 'Blocos',
      icon: IconsBlocks,
      to: '/sisgea/blocos',
      exact: false,
    },
    {
      type: 'link',
      title: 'Campus',
      icon: IconsSchool,
      to: '/sisgea/campus',
      exact: false,
    },

    { type: 'spacer' },

    {
      type: 'link',
      title: 'Perfil',
      icon: IconsUser,
      to: `/sisgea/perfil`,
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
