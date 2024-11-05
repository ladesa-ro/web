<script setup lang="ts">
import { useMonitorSize } from '~/composables/monitor-size';
import type { ISidebarItem } from './ISidebarItem';
import { useInit } from '~/composables/useInit';

//

type Props = {
  items: ISidebarItem[];
};

const props = defineProps<Props>();

//

const init = useInit();

const { isMobile } = useMonitorSize();

const items = toRef(props, 'items');

const hamburgerActive = defineModel({
  required: true,
  type: Boolean,
});
</script>

<template>
  <v-navigation-drawer
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
        <SidebarItem :key="index" :item="item" v-for="(item, index) in items" />
      </div>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>
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
  @apply bg-green-700 text-white caret-white;
  @apply overflow-auto;
}
.navigation-drawer-drawer img {
  @apply filter invert;
}

.active {
  @apply bg-green-600 rounded-lg;
}
</style>
