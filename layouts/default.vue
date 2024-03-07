<script setup>
const sidebarOpened = ref(true);

const init = ref(false);

onMounted(() => {
  init.value = true;
});
</script>

<template>
  <v-app class="app" style="z-index: 1">
    <v-layout>
      <v-app-bar :class="{ toolbar: !init }" elevation="2">
        <Appbar />
      </v-app-bar>

      <v-navigation-drawer
        v-model:model-value="sidebarOpened"
        :class="{ ['navigation-drawer']: !init }"
        class="px-1"
        width="237"
        color="#39A048"
        rail-width="64"
        expand-on-hover
        rail
      >
        <Sidebar />
      </v-navigation-drawer>

      <v-main :class="{ main: !init }">
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

.navigation-drawer {
  left: 0px !important;
  transform: translateX(0%) !important;
  position: absolute !important;
  height: calc(100% - 64px) !important;
  top: 64px !important;
  bottom: 0px !important;
  width: 64px !important;
}

.main {
  --v-layout-left: 64px !important;
  --v-layout-right: 0px !important;
  --v-layout-top: 64px !important;
  --v-layout-bottom: 0px !important;
  min-height: 300px;
}
</style>
