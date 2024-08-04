import iconHome from '~/assets/icons/Home.svg';
import type { ISidebarItem } from '../../../../../../Sidebar/ISidebarItem';

export const useLayoutsDashboardProfessorSidebarItems = () => {
  const items: ISidebarItem[] = [
    {
      type: 'link',
      title: 'Início',
      icon: iconHome,
      to: '/professor',
      exact: true,
    },
  ];

  return { items };
};
