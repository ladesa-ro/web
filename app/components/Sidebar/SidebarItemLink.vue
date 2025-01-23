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
    <SidebarItemTemplate :item="item"/>
  </nuxt-link>
</template>

<style scoped>
.active {
  @apply bg-ldsa-white/[0.12] hover:bg-ldsa-white/[0.18];
}
</style>
