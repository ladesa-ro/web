<script lang="ts" setup>
import { HeadTitleContext } from '~/utils';
import { provideLayoutsDashboardContext } from './context';

import { UIToast } from '#components';

type Slots = {
  sidebar(): any;
  default(): any;
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

    <section
      class="flex flex-col overflow-auto max-sm:ml-0 min-sm:ml-0"
      :data-hamburger-active="hamburguerActive"
    >
      <!-- main content -->
      <main class="flex-1 flex flex-col py-10">
        <slot />
      </main>

      <UIFooter />
    </section>

    <UIToast />
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
    'sidebar content' 1fr
    / auto 1fr;
}

#appbar {
  grid-area: appbar;
}

#sidebar {
  grid-area: sidebar;
}

section {
  grid-area: content;
}

/* Transition */

section {
  @apply transition-[margin] duration-200;
}

section[data-hamburger-active='true'] {
  @apply min-sm:ml-64;
}

section[data-hamburger-active='false'] {
  @apply min-sm:ml-14;
}
</style>
