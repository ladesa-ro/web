<script setup>
import { ref } from 'vue';
import Appbar from '~/components/Appbar/Appbar.vue';
import Sidebar from '~/components/Sidebar/Sidebar.vue';
import { useCustomTheme } from '~/composables/useCustomTheme';
import { HeadTitleContext } from '../infrastructure/HeadTitleContext';

const { isDark } = useCustomTheme();

const habumguerActive = ref(false);

useTitle(HeadTitleContext.DASHBOARD);

const init = ref(false);

onMounted(() => {
  init.value = true;
});
</script>

<template>
  <v-app
    class="app"
    style="z-index: 1"
    :theme="isDark ? 'dark' : 'light'"
    :class="{ initializing: !init }"
  >
    <v-layout class="layout">
      <v-app-bar
        app
        height="72"
        :elevation="0"
        style="box-shadow: 0px 0px 30px 0px rgba(17, 141, 59, 0.15)"
        class="sticky w-full !border-solid !border-[#dddddd] !border-b-[1px]"
      >
        <Appbar v-model="habumguerActive" />
      </v-app-bar>

      <Sidebar v-model="habumguerActive" />

      <v-main class="main">
        <div class="main-content">
          <div class="flex-1 flex">
            <slot></slot>
          </div>

          <UIFooter />
        </div>
      </v-main>
    </v-layout>
  </v-app>
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
