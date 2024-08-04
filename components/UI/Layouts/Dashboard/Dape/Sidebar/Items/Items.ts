import iconCalendario from '~/assets/icons/Calendario.svg';
import iconConfiguracoes from '~/assets/icons/Configurar.svg';
import iconCursos from '~/assets/icons/Curso.svg';
import iconDiario from '~/assets/icons/Diario.svg';
import iconDisciplina from '~/assets/icons/Disciplina.svg';
import iconHome from '~/assets/icons/Home.svg';
import iconOutros from '~/assets/icons/Mais-Itens.svg';
import iconTurmas from '~/assets/icons/Turmas.svg';
import iconPerfil from '~/assets/icons/Usuario.svg';
import iconUsuarios from '~/assets/icons/Usuarios.svg';
import type { ISidebarItem } from '../../../../../../Sidebar/ISidebarItem';

export const useLayoutsDashboardDapeSidebarItems = () => {
  const items: ISidebarItem[] = [
    {
      type: 'link',
      title: 'Início',
      icon: iconHome,
      to: '/dape',
      exact: true,
    },
    {
      type: 'link',
      title: 'Turmas',
      icon: iconTurmas,
      to: '/dape/turmas',
      exact: false,
    },
    {
      type: 'link',
      title: 'Disciplinas',
      icon: iconDisciplina,
      to: '/dape/disciplinas',
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
          to: '/dape/usuarios',
          exact: false,
        },
        {
          type: 'link',
          title: 'Cursos',
          icon: iconCursos,
          to: '/dape/cursos',
          exact: false,
        },
      ],
    },
    {
      type: 'spacer',
    },
    {
      type: 'link',
      title: 'Configurações',
      icon: iconConfiguracoes,
      to: '/configuracoes',
      exact: false,
    },
  ];

  return { items };
};
