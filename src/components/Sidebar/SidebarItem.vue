<script setup lang="ts">
import type { ISidebarItem } from './ISidebarItem';

type Props = {
  item: ISidebarItem;
};
const props = defineProps<Props>();
const { item } = toRefs(props);
</script>

<template>
  <!-- TODO: tornar o template dos itens da sidebar em componente que será chamado em sidebaritemlink e sidebaritemgroup!! -->
  <SidebarItemLink v-if="item.type === 'link'" :item="item" v-bind="$attrs" />

  <SidebarItemGroup v-if="item.type === 'group'" :item="item" v-bind="$attrs" />

  <SidebarItemSpacer
    v-if="item.type === 'spacer'"
    :item="item"
    v-bind="$attrs"
  />
</template>
