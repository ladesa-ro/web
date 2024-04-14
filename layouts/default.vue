<script setup>
import { ref } from "vue";
import Responsive from "~/components/Sidebar/ResponsiveSidebar.vue";

const init = ref(true);

onMounted(() => {
  init.value = true;
});
</script>

<template>
  <v-app class="app" style="z-index: 1">
    <v-layout class="layout">
      <v-app-bar :class="{ toolbar: !init }" class="fixed" elevation="2">
        <Appbar />
      </v-app-bar>

      <Responsive />

      <v-main class="content" :class="{ main: !init }">
        <slot></slot>
      </v-main>
    </v-layout>
  </v-app>
</template>

<style scoped>
.toolbar {
  top: 0px !important;
  transform: translateY(0%) !important;
  position: absolute !important;
  left: 0px !important;
  width: calc(100% - 0px) !important;
}

.main {
  --v-layout-left: 64px !important;
  --v-layout-right: 0px !important;
  --v-layout-top: 64px !important;
  --v-layout-bottom: 0px !important;
  min-height: 300px;
}

.fixed {
  position: fixed !important;
}

.layout {
  overflow: hidden;
  height: 100vh;
}

.content {
  overflow: auto;
}
</style>
