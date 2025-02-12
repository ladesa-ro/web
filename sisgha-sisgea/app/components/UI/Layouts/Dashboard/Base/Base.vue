<script lang="ts" setup>
import { HeadTitleContext } from '~/utils';
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
    <Appbar id="appbar" v-model="hamburguerActive" class="sticky" />

    <slot id="sidebar" name="sidebar" />

    <main class="flex flex-col overflow-auto">
      <!-- main content -->
      <section
        :class="[
          hamburguerActive ? 'content-sidebar-active' : 'content-default',
        ]"
        class="flex-1 flex flex-col"
      >
        <slot />
      </section>

      <UIFooter />
    </main>
  </div>
</template>

<style scoped>
@reference "~/assets/styles/app.css";

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
