<script setup lang="ts">
import { CollapsibleContent, CollapsibleRoot } from 'radix-vue';
import type { ISidebarItemGroup } from './ISidebarItem';

type Props = { item: ISidebarItemGroup };
const { item } = defineProps<Props>();

//

const open = ref(false);
</script>

<template>
  <CollapsibleRoot v-model:open="open" :class="{ open: open }">
    <SidebarSidebarItemTemplate
      :item="item"
      @click="open = !open"
      :open="open"
    />

    <CollapsibleContent
      class="collapsible-animation flex flex-col overflow-hidden"
    >
      <div class="divider" />

      <SidebarSidebarItem
        v-for="(sidebarItem, index) in item.items"
        :item="sidebarItem"
        :key="index"
      />
    </CollapsibleContent>
  </CollapsibleRoot>
</template>

<style scoped>
@reference "~/assets/styles/app.css";

.open {
  @apply bg-ldsa-green-2/25;
}

.divider {
  /* uses min and max height and not just height to avoid conflict with the radix variable */
  @apply min-h-px max-h-px bg-ldsa-white/10 my-1.5;
}

/* Collapsible animation */

.collapsible-animation[data-state='open'] {
  @apply animate-[slideDown_0.3s];
}

.collapsible-animation[data-state='closed'] {
  @apply animate-[slideUp_0.3s];
  @apply bg-ldsa-green-2/25;
}

@keyframes slideDown {
  from {
    height: 0;
  }
  to {
    height: var(--radix-collapsible-content-height);
  }
}

@keyframes slideUp {
  from {
    height: var(--radix-collapsible-content-height);
  }
  to {
    height: 0;
  }
}
</style>
