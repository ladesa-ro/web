<script setup lang="ts">
import { CollapsibleContent, CollapsibleRoot } from 'radix-vue';
import type { ISidebarItemGroup } from './ISidebarItem';

type Props = { item: ISidebarItemGroup };
const props = defineProps<Props>();
const { item } = toRefs(props);

//

const open = ref(false);
</script>

<template>
  <CollapsibleRoot v-model:open="open" :class="{ open: open }">
    <SidebarItemTemplate
      :icon="item.icon"
      :title="item.title"
      @click="open = !open"
    />

    <CollapsibleContent
      class="collapsible-animation flex flex-col overflow-hidden"
    >
      <!-- this line uses min and max height to avoid conflict with the radix variables -->
      <div class="divider" />

      <SidebarItem
        v-for="(item, index) in item.items"
        :item="item"
        :key="index"
      />
    </CollapsibleContent>
  </CollapsibleRoot>
</template>

<style scoped>
.open {
  @apply bg-ldsa-white/[0.08];
}

.divider {
  @apply min-h-[1px] max-h-[1px] bg-ldsa-white/10 my-1.5;
}

/* Collapsible animation */

.collapsible-animation[data-state='open'] {
  @apply animate-[slideDown_0.2s];
}

.collapsible-animation[data-state='closed'] {
  @apply animate-[slideUp_0.2s];
  @apply open; /* guarantees the correct color will remain during the slideUp animation */
}

@keyframes slideDown {
  from { height: 0; }
  to { height: var(--radix-collapsible-content-height); }
}

@keyframes slideUp {
  from { height: var(--radix-collapsible-content-height); }
  to { height: 0;}
}
</style>
