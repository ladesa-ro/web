import iconCalendario from '~/assets/icons/Calendario/Calendario.svg';
import iconCursos from '~/assets/icons/Curso.svg';
import iconDiario from '~/assets/icons/Diario.svg';
import iconDisciplina from '~/assets/icons/Disciplina.svg';
import iconHome from '~/assets/icons/Home.svg';
import iconLogout from '~/assets/icons/Logout.svg';
import iconOutros from '~/assets/icons/Mais-Itens.svg';
import iconManagement from '~/assets/icons/Management.svg';
import iconClock from '~/assets/icons/Relogio.svg';
import iconReport from '~/assets/icons/TeacherLesson.svg';
import iconTurmas from '~/assets/icons/Turmas.svg';
import iconPerfil from '~/assets/icons/Usuario.svg';
import iconUsuarios from '~/assets/icons/Usuarios.svg';
import type { ISidebarItem } from '../../../../../../../Sidebar/SidebarItem/ISidebarItem';

const CAMINHO_DAPE: string = '/sisgha/dape';

export const useLayoutsDashboardSisghaDapeSidebarItems = () => {
  const items: ISidebarItem[] = [
    {
      type: 'link',
      title: 'Início',
      icon: iconHome,
      to: `${CAMINHO_DAPE}/`,
      exact: true,
    },

    {
      type: 'link',
      title: 'Horário',
      icon: iconClock,
      to: `${CAMINHO_DAPE}/horario`,
      exact: false,
    },

    {
      type: 'link',
      title: 'Calendário',
      icon: iconCalendario,
      to: `${CAMINHO_DAPE}/calendario`,
      exact: false,
    },

    {
      type: 'group',
      title: 'Gestão',
      icon: iconManagement,
      items: [
        {
          type: 'link',
          title: 'Diários',
          icon: iconDiario,
          to: `${CAMINHO_DAPE}/diarios`,
          exact: false,
        },
        {
          type: 'link',
          title: 'Turmas',
          icon: iconTurmas,
          to: `${CAMINHO_DAPE}/turmas`,
          exact: false,
        },
        {
          type: 'link',
          title: 'Usuários',
          icon: iconUsuarios,
          to: `${CAMINHO_DAPE}/usuarios`,
          exact: false,
        },
      ],
    },

    {
      type: 'group',
      title: 'Ensino',
      icon: iconOutros,
      items: [
        {
          type: 'link',
          title: 'Disciplinas',
          icon: iconDisciplina,
          to: `${CAMINHO_DAPE}/disciplinas`,
          exact: false,
        },
        {
          type: 'link',
          title: 'Cursos',
          icon: iconCursos,
          to: `${CAMINHO_DAPE}/cursos`,
          exact: false,
        },
      ],
    },

    {
      type: 'group',
      title: 'Relatórios',
      icon: iconOutros,
      items: [
        {
          type: 'link',
          title: 'Aulas ministradas',
          icon: iconReport,
          to: '${CAMINHO_DAPE}/relatorios/aulasMinistradas',
          exact: false,
        },
        {
          type: 'link',
          title: 'Relatório 2',
          icon: iconOutros,
          to: '${CAMINHO_DAPE}/relatorios/relatorio2',
          exact: false,
        },
        {
          type: 'link',
          title: 'Relatório 3',
          icon: iconOutros,
          to: '${CAMINHO_DAPE}/relatorios/relatorio3',
          exact: false,
        },
      ],
    },

    { type: 'spacer' },

    {
      type: 'link',
      title: 'Perfil',
      icon: iconPerfil,
      to: `${CAMINHO_DAPE}/perfil`,
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
