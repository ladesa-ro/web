<script lang="ts" setup>
import type { ISidebarItemGroup, ISidebarItemLink } from './ISidebarItem';

type Props = { item: ISidebarItemLink | ISidebarItemGroup; open?: boolean };

const { item, open } = defineProps<Props>();
</script>

<template>
  <button class="template-base">
    <span class="flex items-center gap-4">
      <component
        :is="item.icon"
        class="min-w-5 w-5 sm:min-w-5.5 sm:w-5.5 text-ldsa-white"
      />

      <p class="text-nowrap">{{ item.title }}</p>
    </span>

    <IconsArrowSidebar
      v-if="item.type === 'group'"
      :class="{ 'arrow-active': open }"
      class="icon-arrow"
    />
  </button>
</template>

<style scoped>
@reference "~/assets/styles/app.css";

.template-base {
  @apply flex items-center justify-between;
  @apply w-full min-h-10 sm:min-h-11 px-4;
  @apply text-ldsa-white hover:bg-ldsa-white/[0.07];
}

.icon-arrow {
  @apply w-3 mr-1 transition-transform text-ldsa-white opacity-60;
}

.arrow-active {
  @apply rotate-180 text-ldsa-white opacity-100;
}
</style>
