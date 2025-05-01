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
    <SidebarSidebarItemTemplate :item="item" />
  </nuxt-link>
</template>

<style scoped>
@reference "~/assets/styles/app-reference.css";

.active {
  @apply bg-ldsa-white/[0.12] hover:bg-ldsa-white/[0.16];
}
</style>
