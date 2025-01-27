<script setup lang="ts">
import type { ISidebarItemLink } from './ISidebarItem';

type Props = { item: ISidebarItemLink };
const props = defineProps<Props>();
const { item } = toRefs(props);
</script>

<template>
  <nuxt-link
    exact-active-class="active"
    :active-class="props.item.exact ? '' : 'active'"
    :key="item.title"
    :to="item.to"
  >
    <SidebarSidebarItemTemplate :item="item" />
  </nuxt-link>
</template>

<style scoped>
@reference "~/assets/styles/app.css";

.active {
  @apply bg-ldsa-white/[0.12] hover:bg-ldsa-white/[0.16];
}
</style>
