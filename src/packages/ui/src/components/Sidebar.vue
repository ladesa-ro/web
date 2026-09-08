<script lang="ts" setup>
import type { Component } from 'vue';
import { provide, ref } from 'vue';
import SidebarItem from './SidebarItem.vue';
import { SidebarSelectedItemKey, type SidebarItemModel } from './sidebar-item';

export type SidebarProps = {
  items: SidebarItemModel[];
  linkAs?: string | Component;
};

defineProps<SidebarProps>();

const hamburgerActive = defineModel<boolean>({ required: true });

const selectedItem = ref<SidebarItemModel | undefined>(undefined);

provide(SidebarSelectedItemKey, selectedItem);
</script>

<template>
  <nav
    class="ui-sidebar"
    :class="hamburgerActive ? 'ui-sidebar--open' : 'ui-sidebar--closed'"
  >
    <template v-for="(item, index) in items" :key="index">
      <SidebarItem
        v-if="!('hidden' in item && item.hidden)"
        :item="item"
        :link-as="linkAs"
        @click="selectedItem = item"
      />
    </template>
  </nav>
</template>
