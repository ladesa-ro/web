<script setup lang="ts">
import { CollapsibleContent, CollapsibleRoot } from 'radix-vue';
import type { ISidebarItemGroup } from './ISidebarItem';

type Props = { item: ISidebarItemGroup };
const props = defineProps<Props>();
const { item } = toRefs(props);

const open = ref(false);
</script>

<template>
  <CollapsibleRoot
    :class="{ open: open }"
    :open="open"
  >
    <button
      class="flex flex-row items-center px-[16px] w-[256px] min-h-[48px] text-ldsa-white hover:bg-ldsa-white/[0.08]"
      @click="open = !open"
    >
      <img class="w-[24px] mr-[16px] -icon-white" :src="item.icon" alt="Ícone da funcionalidade." />
      <span> {{ item.title }} </span>
    </button>

    <CollapsibleContent>
      <SidebarItem
        v-for="(item, index) in item.items"
        :class="{ open: open, 'hover:bg-ldsa-white/[0.18]': open }"
        :item="item"
        :key="index"
      />
    </CollapsibleContent>
  </CollapsibleRoot>
</template>

<style scoped>
.open {
  @apply bg-ldsa-white/[0.12];
}
</style>