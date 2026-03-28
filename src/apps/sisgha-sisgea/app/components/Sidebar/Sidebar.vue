<script lang="ts" setup>
import type { ISidebarItem } from './SidebarItem/ISidebarItem';

type Props = { items: ISidebarItem[] };
const { items } = defineProps<Props>();

//

//defines if the sidebar is active
const hamburgerActive = defineModel<boolean>({
  required: true,
});

let selectedItem = ref<ISidebarItem | undefined>(undefined);

// injected in SidebarItemGroup.vue
provide('selectedItem', selectedItem);
</script>

<template>
  <nav
    :class="{
      active: hamburgerActive,
      'max-sm:-translate-x-full': !hamburgerActive,
    }"
    class="sidebar"
  >
    <SidebarSidebarItem
      v-for="(item, index) in items"
      :key="index"
      :item="item"
      @click="selectedItem = item"
    />
  </nav>
</template>

<style scoped>
@reference "~/assets/styles/app.css";

.sidebar {
  @apply fixed top-14 sm:top-[4.563rem] bottom-0;
  @apply overflow-y-auto min-[640px]:overflow-hidden z-20;
  @apply flex flex-col gap-2.5 lg:gap-3;
  @apply w-14 py-[0.438rem];
  @apply border-r-2 border-r-ldsa-green-2/50 bg-ldsa-green-1;
  @apply transition-[width,translate] duration-200;
}

.sidebar:hover,
.active {
  @apply max-[345px]:w-56 min-[345px]:w-64;
}
</style>
