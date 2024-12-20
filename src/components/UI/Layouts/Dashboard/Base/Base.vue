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
      <main class="flex">
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
.layout {
  @apply overflow-auto;
  @apply h-[100vh]  /* fallback para caso o dispositivo não suporte dvh */
        h-[100dvh];
}

.main-content {
  @apply flex-1;

  @apply flex flex-col;
}
</style>
