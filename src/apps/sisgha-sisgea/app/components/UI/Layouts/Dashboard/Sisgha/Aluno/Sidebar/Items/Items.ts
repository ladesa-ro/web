import { IconsCalendar, IconsLogout } from '#components';
import type { ISidebarItem } from '~/components/Sidebar/SidebarItem/ISidebarItem';

const CAMINHO_ALUNO: string = '/sisgha/aluno';

export const useLayoutsDashboardSisghaAlunoSidebarItems = () => {
  const items: ISidebarItem[] = [
    {
      type: 'link',
      title: 'Meu horário',
      icon: IconsCalendar,
      to: `${CAMINHO_ALUNO}/horario`,
      exact: false,
    },

    { type: 'spacer' },

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
