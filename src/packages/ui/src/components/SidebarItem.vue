<script lang="ts" setup>
import type { Component } from 'vue';
import SidebarItemGroup from './SidebarItemGroup.vue';
import SidebarItemLink from './SidebarItemLink.vue';
import SidebarItemSpacer from './SidebarItemSpacer.vue';
import type { SidebarItemModel } from './sidebar-item';

export type SidebarItemProps = {
  item: SidebarItemModel;
  linkAs?: string | Component;
};

defineProps<SidebarItemProps>();
</script>

<template>
  <SidebarItemLink
    v-if="item.type === 'link'"
    :item="item"
    :as="linkAs"
    v-bind="$attrs"
  />

  <SidebarItemGroup
    v-else-if="item.type === 'group'"
    :item="item"
    :link-as="linkAs"
    v-bind="$attrs"
  />

  <SidebarItemSpacer v-else-if="item.type === 'spacer'" v-bind="$attrs" />
</template>
