<script lang="ts" setup>
import type { ISidebarItem } from './SidebarItem/ISidebarItem';

type Props = { items: ISidebarItem[] };
const { items } = defineProps<Props>();

//

//defines if the sidebar is active
const hamburgerActive = defineModel<boolean>({
  required: true,
});

const selectedItem = ref<ISidebarItem | undefined>(undefined);

// injected in SidebarItemGroup.vue
provide('selectedItem', selectedItem);
</script>

<template>
  <nav
    :class="{
      active: hamburgerActive,
      'sidebar--closed': !hamburgerActive,
    }"
    class="sidebar"
  >
    <template v-for="(item, index) in items" :key="index">
      <SidebarSidebarItem
        v-if="!('hidden' in item && item.hidden)"
        :item="item"
        @click="selectedItem = item"
      />
    </template>
  </nav>
</template>

<style scoped>
.sidebar {
  position: fixed;
  top: 3.5rem;
  bottom: 0;
  overflow: hidden;
  z-index: 20;
  display: flex;
  flex-direction: column;
  gap: var(--ui-space-2-5);
  width: 3.5rem;
  padding-block: 0.438rem;
  border-right: 2px solid rgb(from var(--ladesa-green-2-color) R G B / 50%);
  background-color: var(--ladesa-green-1-color);
  transition:
    width var(--ui-duration-base) var(--ui-easing-standard),
    translate var(--ui-duration-base) var(--ui-easing-standard);
}

@media (min-width: 640px) {
  .sidebar {
    top: 4.563rem;
  }
}

@media (min-width: 1024px) {
  .sidebar {
    gap: var(--ui-space-3);
  }
}

.sidebar:hover,
.active {
  overflow-y: auto;
  overflow-x: hidden;
}

@media (max-width: 345px) {
  .sidebar:hover,
  .active {
    width: 14rem;
  }
}

@media (min-width: 345px) {
  .sidebar:hover,
  .active {
    width: 16rem;
  }
}

@media (max-width: 639.98px) {
  .sidebar--closed {
    transform: translateX(-100%);
  }
}
</style>
