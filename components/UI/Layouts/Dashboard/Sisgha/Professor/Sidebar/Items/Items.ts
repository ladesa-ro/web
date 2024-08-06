import iconHome from '~/assets/icons/Home.svg';
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
  ];

  return { items };
};
