<script lang="ts" setup>
import IconArrowSidebar from '../icons/Arrow/ArrowSidebar.vue';
import type { SidebarItemGroupModel, SidebarItemLinkModel } from './sidebar-item';

export type SidebarItemTemplateProps = {
  item: SidebarItemLinkModel | SidebarItemGroupModel;
  open?: boolean;
};

const { item, open } = defineProps<SidebarItemTemplateProps>();
</script>

<template>
  <button type="button" class="ui-sidebar-item">
    <span class="ui-sidebar-item__label-group">
      <component :is="item.icon" class="ui-sidebar-item__icon" />

      <p class="ui-sidebar-item__label">{{ item.title }}</p>
    </span>

    <IconArrowSidebar
      v-if="item.type === 'group'"
      class="ui-sidebar-item__arrow"
      :class="{ 'ui-sidebar-item__arrow--open': open }"
    />
  </button>
</template>
