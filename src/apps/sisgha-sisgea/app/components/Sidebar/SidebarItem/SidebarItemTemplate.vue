<script lang="ts" setup>
import type { ISidebarItemGroup, ISidebarItemLink } from './ISidebarItem';

type Props = { item: ISidebarItemLink | ISidebarItemGroup; open?: boolean };

const { item, open } = defineProps<Props>();
</script>

<template>
  <button class="template-base">
    <span class="u-flex u-items-center u-gap-4">
      <component :is="item.icon" class="sidebar-item__icon" />

      <p class="sidebar-item__label">{{ item.title }}</p>
    </span>

    <IconsArrowSidebar
      v-if="item.type === 'group'"
      :class="{ 'arrow-active': open }"
      class="icon-arrow"
    />
  </button>
</template>

<style scoped>
.template-base {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 2.5rem;
  padding-inline: var(--ui-space-4);
  color: var(--ladesa-white-color);
}

.template-base:hover {
  background-color: rgb(from var(--ladesa-white-color) R G B / 7%);
}

@media (min-width: 640px) {
  .template-base {
    min-height: 2.75rem;
  }
}

.sidebar-item__icon {
  min-width: var(--ui-space-5);
  width: var(--ui-space-5);
  color: var(--ladesa-white-color);
}

@media (min-width: 640px) {
  .sidebar-item__icon {
    min-width: 1.375rem;
    width: 1.375rem;
  }
}

.sidebar-item__label {
  white-space: nowrap;
}

.icon-arrow {
  width: var(--ui-space-3);
  margin-right: var(--ui-space-1);
  transition: transform 150ms var(--ui-easing-standard);
  color: var(--ladesa-white-color);
  opacity: 0.6;
}

.arrow-active {
  transform: rotate(180deg);
  color: var(--ladesa-white-color);
  opacity: 1;
}
</style>
