import iconCalendario from '~/assets/icons/Calendario.svg';
import iconHome from '~/assets/icons/Home.svg';
import iconLogout from '~/assets/icons/Logout.svg';
import iconPerfil from '~/assets/icons/Usuario.svg';
import type { ISidebarItem } from '../../../../../../../Sidebar/ISidebarItem';

export const useLayoutsDashboardSisghaProfessorSidebarItems = () => {
  const items: ISidebarItem[] = [
    {
      type: 'link',
      title: 'Início',
      icon: iconHome,
      to: '/sisgha/professor',
      exact: true,
    },

    {
      type: 'link',
      title: 'Perfil',
      icon: iconPerfil,
      to: '/perfil',
      exact: false,
    },

    {
      type: 'link',
      title: 'Calendário',
      icon: iconCalendario,
      to: '/calendario',
      exact: false,
    },

    { type: 'spacer' },

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
