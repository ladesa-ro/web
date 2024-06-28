<script setup lang="ts">
import type { ISidebarItem } from './ISidebarItem';

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
}) as { item: ISidebarItem };

const { item } = toRefs(props);
</script>

<template>
  <SidebarItemLink v-if="item.type === 'link'" :item="item" v-bind="$attrs" />

  <SidebarItemGroup v-if="item.type === 'group'" :item="item" v-bind="$attrs" />

  <SidebarItemSpacer
    v-if="item.type === 'spacer'"
    :item="item"
    v-bind="$attrs"
  />
</template>
