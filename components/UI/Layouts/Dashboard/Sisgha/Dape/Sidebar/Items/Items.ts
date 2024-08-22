import iconCalendario from '~/assets/icons/Calendario/Calendario.svg';
import iconCursos from '~/assets/icons/Curso.svg';
import iconDiario from '~/assets/icons/Diario.svg';
import iconDisciplina from '~/assets/icons/Disciplina.svg';
import iconHome from '~/assets/icons/Home.svg';
import iconLogout from '~/assets/icons/Logout.svg';
import iconOutros from '~/assets/icons/Mais-Itens.svg';
import iconTurmas from '~/assets/icons/Turmas.svg';
import iconPerfil from '~/assets/icons/Usuario.svg';
import iconUsuarios from '~/assets/icons/Usuarios.svg';
import type { ISidebarItem } from '../../../../../../../Sidebar/ISidebarItem';

export const useLayoutsDashboardSisghaDapeSidebarItems = () => {
  const items: ISidebarItem[] = [
    {
      type: 'link',
      title: 'Início',
      icon: iconHome,
      to: '/sisgha/dape',
      exact: true,
    },
    {
      type: 'link',
      title: 'Turmas',
      icon: iconTurmas,
      to: '/sisgha/dape/turmas',
      exact: false,
    },
    {
      type: 'link',
      title: 'Disciplinas',
      icon: iconDisciplina,
      to: '/sisgha/dape/disciplinas',
      exact: false,
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
      title: 'Diários',
      icon: iconDiario,
      to: '/dashboard/diarios',
      exact: false,
    },
    {
      type: 'link',
      title: 'Calendário',
      icon: iconCalendario,
      to: '/calendario',
      exact: false,
    },
    {
      type: 'group',
      title: 'Outros',
      icon: iconOutros,
      items: [
        {
          type: 'link',
          title: 'Usuários',
          icon: iconUsuarios,
          to: '/sisgha/dape/usuarios',
          exact: false,
        },
        {
          type: 'link',
          title: 'Cursos',
          icon: iconCursos,
          to: '/sisgha/dape/cursos',
          exact: false,
        },
      ],
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
