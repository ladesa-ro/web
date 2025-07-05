import Calendar from '~/components/Icons/Calendar/Calendar.vue';
import Class from '~/components/Icons/Class.vue';
import Clock from '~/components/Icons/Clock.vue';
import Course from '~/components/Icons/Course.vue';
import Diary from '~/components/Icons/Diary.vue';
import Discipline from '~/components/Icons/Discipline.vue';
import Home from '~/components/Icons/Home.vue';
import Logout from '~/components/Icons/Logout.vue';
import Others from '~/components/Icons/Others.vue';
import TeacherLesson from '~/components/Icons/TeacherLesson.vue';
import User from '~/components/Icons/User.vue';
import Users from '~/components/Icons/Users.vue';
import Management from '~/components/Icons/Management.vue';

import type { ISidebarItem } from '~/components/Sidebar/SidebarItem/ISidebarItem';

const CAMINHO_DAPE: string = '/sisgha/dape';

export const useLayoutsDashboardSisghaDapeSidebarItems = () => {
  const items: ISidebarItem[] = [
    {
      type: 'link',
      title: 'Início',
      icon: Home,
      to: `${CAMINHO_DAPE}/`,
      exact: true,
    },

    {
      type: 'link',
      title: 'Horário',
      icon: Clock,
      to: `${CAMINHO_DAPE}/horario`,
      exact: false,
    },

    {
      type: 'link',
      title: 'Calendário',
      icon: Calendar,
      to: `${CAMINHO_DAPE}/calendario`,
      exact: false,
    },

    {
      type: 'group',
      title: 'Gestão',
      icon: Management,
      items: [
        {
          type: 'link',
          title: 'Diários',
          icon: Diary,
          to: `${CAMINHO_DAPE}/diarios`,
          exact: false,
        },
        {
          type: 'link',
          title: 'Turmas',
          icon: Class,
          to: `${CAMINHO_DAPE}/turmas`,
          exact: false,
        },
        {
          type: 'link',
          title: 'Usuários',
          icon: Users,
          to: `${CAMINHO_DAPE}/usuarios`,
          exact: false,
        },
      ],
    },

    {
      type: 'group',
      title: 'Ensino',
      icon: Others,
      items: [
        {
          type: 'link',
          title: 'Disciplinas',
          icon: Discipline,
          to: `${CAMINHO_DAPE}/disciplinas`,
          exact: false,
        },
        {
          type: 'link',
          title: 'Cursos',
          icon: Course,
          to: `${CAMINHO_DAPE}/cursos`,
          exact: false,
        },
      ],
    },

    {
      type: 'group',
      title: 'Relatórios',
      icon: Others,
      items: [
        {
          type: 'link',
          title: 'Aulas ministradas',
          icon: TeacherLesson,
          to: `${CAMINHO_DAPE}/relatorios/aulas-ministradas`,
          exact: false,
        },
        {
          type: 'link',
          title: 'Relatório 2',
          icon: Others,
          to: '${CAMINHO_DAPE}/relatorios/relatorio2',
          exact: false,
        },
        {
          type: 'link',
          title: 'Relatório 3',
          icon: Others,
          to: '${CAMINHO_DAPE}/relatorios/relatorio3',
          exact: false,
        },
      ],
    },

    { type: 'spacer' },

    {
      type: 'link',
      title: 'Perfil',
      icon: User,
      to: `${CAMINHO_DAPE}/perfil`,
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
