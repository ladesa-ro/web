<script lang="ts" setup>
import type { ISidebarItemGroup, ISidebarItemLink } from './ISidebarItem';

type Props = { item: ISidebarItemLink | ISidebarItemGroup; open?: boolean };

const { item, open } = defineProps<Props>();
</script>

<template>
  <button class="template-base">
    <span class="flex items-center gap-4">
      <img
        :src="item.icon"
        class="w-6 -icon-white"
        alt="Ícone da funcionalidade."
      />
      <p>{{ item.title }}</p>
    </span>

    <IconsArrowIconArrowSidebar
      v-if="item.type === 'group'"
      class="icon-arrow"
      :class="{ 'arrow-active': open }"
    />
  </button>
</template>

<style scoped>
.template-base {
  @apply flex items-center justify-between;
  @apply w-64 min-h-12 px-4;
  @apply text-ldsa-white hover:bg-ldsa-white/[0.07];
}

.icon-arrow {
  @apply w-3 mr-1 transition-transform text-ldsa-white/60;
}

.arrow-active {
  @apply rotate-180 text-ldsa-white;
}
</style>
