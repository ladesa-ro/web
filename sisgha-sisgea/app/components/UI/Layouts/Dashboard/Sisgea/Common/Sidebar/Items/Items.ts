import Blocks from '~/components/Icons/Blocks.vue';
import Environment from '~/components/Icons/Environment.vue';
import Logout from '~/components/Icons/Logout.vue';
import Reserve from '~/components/Icons/Reserve.vue';
import User from '~/components/Icons/User.vue';

import type { ISidebarItem } from '~/components/Sidebar/SidebarItem/ISidebarItem';

export const useLayoutsDashboardSisgeaCommonSidebarItems = () => {
  const items: ISidebarItem[] = [
    {
      type: 'link',
      title: 'Reservas',
      icon: Reserve,
      to: '/sisgea/reservas',
      exact: false,
    },
    {
      type: 'link',
      title: 'Ambientes',
      icon: Environment,
      to: '/sisgea/ambientes',
      exact: false,
    },
    {
      type: 'link',
      title: 'Blocos',
      icon: Blocks,
      to: '/sisgea/blocos',
      exact: false,
    },

    { type: 'spacer' },

    {
      type: 'link',
      title: 'Perfil',
      icon: User,
      to: `/sisgea/perfil`,
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
