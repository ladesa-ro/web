<script lang="ts" setup>
import { useMonitorSize } from '~/composables/useMonitorSize';
import type { ISidebarItem } from './SidebarItem/ISidebarItem';

type Props = {
  items: ISidebarItem[];
};
const { items } = defineProps<Props>();

//

//defines if the sidebar is active
const hamburgerActive = defineModel<boolean>({
  required: true,
});

const isMobile = useMonitorSize();

// this watch makes a smoother transition when the screen changes size
watch(isMobile, () => {
  if (hamburgerActive.value) {
    hamburgerActive.value = !hamburgerActive.value;
  }
});
</script>

<template>
  <nav
    :class="{
      active: hamburgerActive,
      '-left-20': isMobile && !hamburgerActive,
    }"
    class="sidebar"
  >
    <SidebarSidebarItem
      v-for="(item, index) in items"
      :key="index"
      :item="item"
    />
  </nav>
</template>

<style scoped>
@reference "~/assets/styles/app.css";

.sidebar {
  @apply fixed top-[4.563rem] bottom-0;
  @apply overflow-hidden z-20;
  @apply flex flex-col gap-3;
  @apply w-14 py-[0.438rem];
  @apply border-r-2 border-r-ldsa-green-2/50 bg-ldsa-green-1;
  @apply transition-[width] duration-200;
}

.sidebar:hover,
.active {
  @apply w-64;
}
</style>
