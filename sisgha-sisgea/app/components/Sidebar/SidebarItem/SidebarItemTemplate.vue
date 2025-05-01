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
        alt="Ícone da funcionalidade."
        class="max-[600px]:w-5 min-[600px]:w-6 -icon-white"
      />
      <p>{{ item.title }}</p>
    </span>

    <IconsArrowIconArrowSidebar
      v-if="item.type === 'group'"
      :class="{ 'arrow-active': open }"
      class="icon-arrow"
    />
  </button>
</template>

<style scoped>
@reference "~/assets/styles/app-reference.css";

.template-base {
  @apply flex items-center justify-between;
  @apply w-full max-sm:min-h-11.5 sm:min-h-12 px-4;
  @apply text-ldsa-white hover:bg-ldsa-white/[0.07];
}

.icon-arrow {
  @apply w-3 mr-1 transition-transform text-ldsa-white opacity-60;
}

.arrow-active {
  @apply rotate-180 text-ldsa-white opacity-100;
}
</style>
