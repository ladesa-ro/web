import iconCalendario from '~/assets/icons/Calendario/Calendario.svg';
import iconHome from '~/assets/icons/Home.svg';
import iconLogout from '~/assets/icons/Logout.svg';
import iconPerfil from '~/assets/icons/Usuario.svg';
import type { ISidebarItem } from '../../../../../../../Sidebar/SidebarItem/ISidebarItem';

const CAMINHO_PROFESSOR: string = '/sisgha/professor';

export const useLayoutsDashboardSisghaProfessorSidebarItems = () => {
  const items: ISidebarItem[] = [
    {
      type: 'link',
      title: 'Início',
      icon: iconHome,
      to: `${CAMINHO_PROFESSOR}/`,
      exact: true,
    },

    {
      type: 'link',
      title: 'Calendário',
      icon: iconCalendario,
      to: `${CAMINHO_PROFESSOR}/calendario`,
      exact: false,
    },

    { type: 'spacer' },

    {
      type: 'link',
      title: 'Perfil',
      icon: iconPerfil,
      to: `${CAMINHO_PROFESSOR}/perfil`,
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
