import {
  IconsCalendar,
  IconsClass,
  IconsClock,
  IconsCourse,
  IconsDiary,
  IconsDiscipline,
  IconsHome,
  IconsLogout,
  IconsManagement,
  IconsOthers,
  IconsTeacherLesson,
  IconsUser,
  IconsUsers,
} from '#components';

import type { ISidebarItem } from '~/components/Sidebar/SidebarItem/ISidebarItem';

const CAMINHO_DAPE: string = '/sisgha/dape';

export const useLayoutsDashboardSisghaDapeSidebarItems = () => {
  const items: ISidebarItem[] = [
    {
      type: 'link',
      title: 'Início',
      icon: IconsHome,
      to: CAMINHO_DAPE,
      exact: true,
    },

    {
      type: 'link',
      title: 'Horário',
      icon: IconsClock,
      to: `${CAMINHO_DAPE}/horario`,
      exact: false,
    },

    {
      type: 'link',
      title: 'Calendário',
      icon: IconsCalendar,
      to: `${CAMINHO_DAPE}/calendario`,
      exact: false,
    },

    {
      type: 'group',
      title: 'Gestão',
      icon: IconsManagement,
      items: [
        {
          type: 'link',
          title: 'Diários',
          icon: IconsDiary,
          to: `${CAMINHO_DAPE}/diarios`,
          exact: false,
        },
        {
          type: 'link',
          title: 'Turmas',
          icon: IconsClass,
          to: `${CAMINHO_DAPE}/turmas`,
          exact: false,
        },
        {
          type: 'link',
          title: 'Usuários',
          icon: IconsUsers,
          to: `${CAMINHO_DAPE}/usuarios`,
          exact: false,
        },
      ],
    },

    {
      type: 'group',
      title: 'Ensino',
      icon: IconsOthers,
      items: [
        {
          type: 'link',
          title: 'Modalidades',
          icon: IconsOthers,
          to: `${CAMINHO_DAPE}/modalidades`,
          exact: false,
        },
        {
          type: 'link',
          title: 'Níveis de Formação',
          icon: IconsOthers,
          to: `${CAMINHO_DAPE}/niveis-formacoes`,
          exact: false,
        },
        {
          type: 'link',
          title: 'Formações',
          icon: IconsOthers,
          to: `${CAMINHO_DAPE}/formacoes`,
          exact: false,
        },
        {
          type: 'link',
          title: 'Disciplinas',
          icon: IconsDiscipline,
          to: `${CAMINHO_DAPE}/disciplinas`,
          exact: false,
        },
        {
          type: 'link',
          title: 'Cursos',
          icon: IconsCourse,
          to: `${CAMINHO_DAPE}/cursos`,
          exact: false,
        },
      ],
    },

    {
      type: 'group',
      title: 'Relatórios',
      icon: IconsOthers,
      items: [
        {
          type: 'link',
          title: 'Aulas ministradas',
          icon: IconsTeacherLesson,
          to: `${CAMINHO_DAPE}/relatorios/aulasMinistradas`,
          exact: false,
        },
      ],
    },

    { type: 'spacer' },

    {
      type: 'link',
      title: 'Perfil',
      icon: IconsUser,
      to: `${CAMINHO_DAPE}/perfil`,
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
