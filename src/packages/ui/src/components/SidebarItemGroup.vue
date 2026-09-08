<script lang="ts" setup>
import type { Component } from 'vue';
import { computed, inject } from 'vue';
import { CollapsibleContent, CollapsibleRoot } from 'reka-ui';
import SidebarItem from './SidebarItem.vue';
import SidebarItemTemplate from './SidebarItemTemplate.vue';
import { SidebarSelectedItemKey, type SidebarItemGroupModel } from './sidebar-item';

export type SidebarItemGroupProps = {
  item: SidebarItemGroupModel;
  linkAs?: string | Component;
};

const { item } = defineProps<SidebarItemGroupProps>();

const selectedItem = inject(SidebarSelectedItemKey);

const isSelected = computed({
  get() {
    const current = selectedItem?.value;
    return !!current && current.type === 'group' && current.title === item.title;
  },

  set(value: boolean) {
    if (!selectedItem) return;
    selectedItem.value = value ? item : undefined;
  },
});
</script>

<template>
  <CollapsibleRoot
    v-model:open="isSelected"
    :class="{ 'ui-sidebar-group--open': isSelected }"
  >
    <SidebarItemTemplate
      :item="item"
      :open="isSelected"
      @click.stop="isSelected = !isSelected"
    />

    <CollapsibleContent
      class="ui-sidebar-group__content u-flex u-flex-col u-overflow-hidden"
    >
      <div class="ui-sidebar-group__divider" />

      <template v-for="(child, index) in item.items" :key="index">
        <SidebarItem
          v-if="!('hidden' in child && child.hidden)"
          :item="child"
          :link-as="linkAs"
        />
      </template>
    </CollapsibleContent>
  </CollapsibleRoot>
</template>
