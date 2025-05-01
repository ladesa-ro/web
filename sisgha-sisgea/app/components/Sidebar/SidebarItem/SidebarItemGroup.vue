<script lang="ts" setup>
import { CollapsibleContent, CollapsibleRoot } from 'reka-ui';
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
      :open="open"
      @click="open = !open"
    />

    <CollapsibleContent
      class="collapsible-animation flex flex-col overflow-hidden"
    >
      <div class="divider" />

      <SidebarSidebarItem
        v-for="(sidebarItem, index) in item.items"
        :key="index"
        :item="sidebarItem"
      />
    </CollapsibleContent>
  </CollapsibleRoot>
</template>

<style scoped>
@reference "~/assets/styles/app-reference.css";

.open {
  @apply bg-ldsa-green-2/25;
}

.divider {
  /* uses min and max height and not just height to avoid conflict with the reka variable */
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
    height: var(--reka-collapsible-content-height);
  }
}

@keyframes slideUp {
  from {
    height: var(--reka-collapsible-content-height);
  }
  to {
    height: 0;
  }
}
</style>
