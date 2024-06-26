<template>
  <v-navigation-drawer
    app
    absolute
    clipped="true"
    :mobile-breakpoint="0"
    disable-resize-watcher
    :temporary="isMobile"
    :permanent="!isMobile"
    class="navigation-drawer"
    :class="{ initializing: !init }"
    :rail="!isMobile && !hamburgerActive"
    :model-value="isMobile ? hamburgerActive : true"
    :expand-on-hover="!isMobile && !hamburgerActive"
    @update:model-value="($val) => (hamburgerActive = $val)"
  >
    <v-list class="flex-column justify-space-between h-full sidebar-list">
      <v-list-item-group class="flex flex-col gap-3 h-full">
        <SidebarItem :key="index" :item="item" v-for="(item, index) in items" />
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useMonitorSize } from '~/composables/monitor-size';

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
import type { ISidebarItem } from './ISidebarItem';

const items: ISidebarItem[] = [
  {
    type: 'link',
    title: 'Início',
    icon: iconHome,
    to: '/',
  },
  {
    type: 'link',
    title: 'Turmas',
    icon: iconTurmas,
    to: '/dashboard/turmas',
  },
  {
    type: 'link',
    title: 'Disciplinas',
    icon: iconDisciplina,
    to: '/dashboard/disciplinas',
  },
  {
    type: 'link',
    title: 'Perfil',
    icon: iconPerfil,
    to: '/perfil',
  },
  {
    type: 'link',
    title: 'Diários',
    icon: iconDiario,
    to: '/dashboard/diarios',
  },
  {
    type: 'link',
    title: 'Calendário',
    icon: iconCalendario,
    to: '/calendario',
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
        to: '/dashboard/usuarios',
      },
      {
        type: 'link',
        title: 'Cursos',
        icon: iconCursos,
        to: '/dashboard/cursos',
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
  },
];

const { isMobile } = useMonitorSize();

const hamburgerActive = defineModel({
  required: true,
  type: Boolean,
});

const init = ref(false);

onMounted(() => {
  init.value = true;
});
</script>

<style scoped>
span {
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 15px;
}

.initializing :deep(.v-navigation-drawer__content) {
  height: 100%;
}

.initializing .sidebar-list {
  overflow: hidden;
}

@media (max-width: 600px) {
  .initializing {
    display: none;
  }
}

.navigation-drawer {
  @apply bg-green-700 text-white caret-white;
  @apply overflow-auto;
}
.navigation-drawer-drawer img {
  @apply filter invert;
}

.active {
  @apply bg-green-600 rounded-lg;
}
</style>
