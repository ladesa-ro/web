<script setup lang="ts">
import { useMonitorSize } from '~/composables/monitor-size';
import type { ISidebarItem } from './ISidebarItem';

type Props = {
  items: ISidebarItem[];
};

const props = defineProps<Props>();
const items = toRef(props, 'items');

//

const { isMobile } = useMonitorSize();

//defines if the sidebar is active
const hamburgerActive = defineModel({
  required: true,
  type: Boolean,
});
</script>

<template>
  <!-- tornar o template dos itens da sidebar em componente que será chamado em sidebaritemlink e sidebaritemgroup!! -->
  <nav class="sidebar">
    <SidebarItem v-for="(item, index) in items" :key="index" :item="item" />
  </nav>



  <!-- <v-navigation-drawer
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
      <div class="flex flex-col gap-3 h-full">
        <SidebarItem v-for="(item, index) in items" :key="index" :item="item" />
      </div>
    </v-list>
  </v-navigation-drawer> -->
</template>

<style scoped>
.sidebar {
  @apply flex flex-col gap-[12px];
  @apply overflow-hidden z-20;
  @apply w-[56px] py-[7px] border-r-[2px] border-r-ldsa-green-2/50 bg-ldsa-green-1;
}

.sidebar:hover {
  @apply w-[256px] fixed top-[72px] bottom-0;
}

/*classes de antes*/

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
  @apply bg-ldsa-green-1 text-ldsa-white caret-ldsa-white; /* bg-green-700 */
  @apply overflow-auto;
  @apply !border-r-0; /* ! para sobrescrever o estilo vuetify */
}
.navigation-drawer-drawer img {
  @apply filter invert;
}

.active {
  @apply bg-ldsa-green-2 rounded-lg; /* bg-green-600 */
}
</style>
