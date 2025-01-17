<script setup lang="ts">
import { HeadTitleContext } from '~/infrastructure/HeadTitleContext';
import { provideLayoutsDashboardContext } from './context';

type Slots = {
  sidebar(props: any): any;
  default(props: any): any;
};
defineSlots<Slots>();

//defines the tab name
useTitle(HeadTitleContext.DASHBOARD);

//defines if the hamburguer sidebar is active
const { hamburguerActive } = provideLayoutsDashboardContext();
</script>

<template>
  <div class="layout-grid layout-height">
    <Appbar v-model="hamburguerActive" class="sticky" id="appbar" />

    <slot name="sidebar" id="sidebar" />

    <main class="flex flex-col overflow-auto">
      <!-- main content -->
      <section
        class="flex-1 flex flex-col"
        :class="[ hamburguerActive ? 'content-sidebar-active' : 'content-default' ]"
      >
        <slot />
      </section>

      <UIFooter />
    </main>
  </div>
</template>

<style scoped>
.layout-height {
  @apply h-[100vh]  /* fallback caso o dispositivo não suporte dvh */
        h-[100dvh];
}

/* Grid layout */

.layout-grid {
  @apply grid;
  grid-template:
    'appbar appbar' auto
    'sidebar main' 1fr
    / auto 1fr;
}

#appbar {
  grid-area: appbar;
}

#sidebar {
  grid-area: sidebar;
}

main {
  grid-area: main;
}

/* Transition */

.content-default {
  @apply ml-14;
}

.content-sidebar-active {
  @apply ml-64;
}

.content-sidebar-active,
.content-default {
  @apply transition-[margin] duration-200;
}
</style>
