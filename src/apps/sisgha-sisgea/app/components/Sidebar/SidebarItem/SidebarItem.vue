<script lang="ts" setup>
import type { ISidebarItem } from './ISidebarItem';

type Props = { item: ISidebarItem };
defineProps<Props>();
</script>

<template>
  <SidebarSidebarItemLink
    v-if="item.type === 'link'"
    :item="item"
    v-bind="$attrs"
  />

  <SidebarSidebarItemGroup
    v-else-if="item.type === 'group'"
    :item="item"
    v-bind="$attrs"
  />

  <SidebarSidebarItemSpacer
    v-else-if="item.type === 'spacer'"
    :item="item"
    v-bind="$attrs"
  />
</template>
