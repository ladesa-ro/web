<script setup lang="ts">
import { HeadTitleContext } from '~/infrastructure/HeadTitleContext';
import { provideLayoutsDashboardContext } from './context';

//defines the tab name
useTitle(HeadTitleContext.DASHBOARD);

//defines if the hamburguer sidebar is active
const { hamburguerActive } = provideLayoutsDashboardContext();

//
type Slots = {
  sidebar(props: any): any;
  default(props: any): any;
};

defineSlots<Slots>();
</script>

<template>
  <div class="flex flex-col layout-height">
    <!-- appbar -->
    <header class="sticky">
      <Appbar v-model="hamburguerActive" />
    </header>

    <div class="flex-1 flex flex-row overflow-hidden">
      <!-- sidebar -->
      <slot name="sidebar" />

      <main class="flex-1 flex flex-col overflow-auto">
        <!-- main content -->
        <section class="flex-1 flex flex-col"> <!--pt-14-->
          <slot />
        </section>

        <!-- footer -->
        <UIFooter />
      </main>
    </div>
  </div>
</template>

<style scoped>
.layout-height {
  @apply h-[100vh]  /* fallback para caso o dispositivo não suporte dvh */
        h-[100dvh];
}
</style>
