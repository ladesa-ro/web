<script setup lang="ts">
import { useMonitorSize } from '~~/app/composables/monitor-size';
import type { ISidebarItem } from './SidebarItem/ISidebarItem';

type Props = {
  items: ISidebarItem[];
};
const props = defineProps<Props>();
const items = toRef(props, 'items');

//

//defines if the sidebar is active
const hamburgerActive = defineModel<boolean>({
  required: true,
});

const { isMobile } = useMonitorSize();
</script>

<template>
  <nav class="sidebar" :class="{ active: hamburgerActive }">
    <SidebarSidebarItem v-for="(item, index) in items" :key="index" :item="item" />
  </nav>
</template>

<style scoped>
.sidebar {
  @apply fixed top-[4.563rem] bottom-0;
  @apply overflow-auto z-20;
  @apply flex flex-col gap-3;
  @apply w-14 py-[0.438rem];
  @apply border-r-2 border-r-ldsa-green-2/50 bg-ldsa-green-1;
  @apply transition-[width] duration-200;
}

.sidebar:hover,
.active {
  @apply w-64;
}

/* TODO: adicionar classe para mobile */
</style>
