<script lang="ts" setup>
import type { ISidebarItemLink } from './ISidebarItem';

type Props = { item: ISidebarItemLink };
const { item } = defineProps<Props>();
</script>

<template>
  <nuxt-link
    :key="item.title"
    :active-class="item.exact ? '' : 'active'"
    :to="item.to"
    exact-active-class="active"
  >
    <SidebarSidebarItemTemplate :item />
  </nuxt-link>
</template>

<style scoped>
.active {
  background-color: rgb(from var(--ladesa-white-color) R G B / 12%);
}

.active:hover {
  background-color: rgb(from var(--ladesa-white-color) R G B / 16%);
}
</style>
