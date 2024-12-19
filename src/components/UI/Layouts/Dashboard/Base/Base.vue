<script setup lang="ts">
import { HeadTitleContext } from '~/infrastructure/HeadTitleContext';
import { provideLayoutsDashboardContext } from './context';

//

useTitle(HeadTitleContext.DASHBOARD);

//

const { hamburguerActive } = provideLayoutsDashboardContext();

//

type Slots = {
  sidebar(props: any): any;
  default(props: any): any;
};

defineSlots<Slots>();

//

const init = useInit();
</script>

<template>
  <div class="app" :class="{ initializing: !init }">
    <div class="layout">
      <!-- Appbar -->
      <section
        class="sticky w-full h-[77px] border-solid border-ldsa-grey/50 border-b-[1px]"
      >
        <Appbar v-model="hamburguerActive" />
      </section>

      <!-- Sidebar -->
      <slot name="sidebar" />

      <!-- Page content + footer -->
      <main class="main">
        <section class="main-content">
          <div class="flex-1 flex">
            <slot />
          </div>

          <UIFooter />
        </section>
      </main>
    </div>
  </div>
</template>

<style scoped>
@media (max-width: 600px) {
  .initializing .main {
    --v-layout-left: 0 !important;
  }
}

.initializing .main {
  flex: 1 0 auto;
  max-width: 100%;
  padding: var(--v-layout-top) var(--v-layout-right) var(--v-layout-bottom)
    var(--v-layout-left);
}

.main {
  overflow: hidden;
  display: flex;
}

.main-content {
  flex: 1;

  overflow: auto;

  display: flex;
  flex-direction: column;
}

.layout {
  overflow: hidden;
  height: 100vh; /* fallback para caso o dispositivo não suporte dvh */
  height: 100dvh;
}
</style>
