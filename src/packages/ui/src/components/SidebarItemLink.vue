<script lang="ts" setup>
import type { Component } from 'vue';
import SidebarItemTemplate from './SidebarItemTemplate.vue';
import type { SidebarItemLinkModel } from './sidebar-item';

export type SidebarItemLinkProps = {
  item: SidebarItemLinkModel;
  as?: string | Component;
};

const { as = 'a' } = defineProps<SidebarItemLinkProps>();
</script>

<template>
  <component
    :is="as"
    :key="item.title"
    :to="item.to"
    :href="item.to"
    :active-class="item.exact ? '' : 'ui-sidebar-item--active'"
    exact-active-class="ui-sidebar-item--active"
  >
    <SidebarItemTemplate :item="item" />
  </component>
</template>
