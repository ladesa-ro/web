import iconAmbientes from '~/assets/icons/Ambientes.svg';
import iconBlocos from '~/assets/icons/Blocos.svg';
import iconLogout from '~/assets/icons/Logout.svg';
import iconReservas from '~/assets/icons/Reservas.svg';
import iconPerfil from '~/assets/icons/Usuario.svg';
import type { ISidebarItem } from '../../../../../../../Sidebar/SidebarItem/ISidebarItem';

export const useLayoutsDashboardSisgeaCommonSidebarItems = () => {
  const items: ISidebarItem[] = [
    {
      type: 'link',
      title: 'Reservas',
      icon: iconReservas,
      to: '/sisgea/reservas',
      exact: false,
    },
    {
      type: 'link',
      title: 'Ambientes',
      icon: iconAmbientes,
      to: '/sisgea/ambientes',
      exact: false,
    },
    {
      type: 'link',
      title: 'Blocos',
      icon: iconBlocos,
      to: '/sisgea/blocos',
      exact: false,
    },

    { type: 'spacer' },

    {
      type: 'link',
      title: 'Perfil',
      icon: iconPerfil,
      to: `/sisgea/perfil`,
      exact: false,
    },

    {
      type: 'link',
      title: 'Sair',
      icon: iconLogout,
      to: '/logout',
      exact: false,
    },
  ];

  return { items };
};
