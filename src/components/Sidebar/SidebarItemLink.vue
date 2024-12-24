<script setup lang="ts">
import type { ISidebarItemLink } from './ISidebarItem';

type Props = { item: ISidebarItemLink };
const props = defineProps<Props>();
const { item } = toRefs(props);
</script>

<template>
  <nuxt-link
    class="flex flex-row items-center px-[16px] w-[256px] h-[48px] text-ldsa-white hover:bg-ldsa-white/[0.08]"
    exact-active-class="active"
    :active-class="props.item.exact ? '' : 'active'"
    :key="item.title"
    :to="item.to"
  >
    <img
      class="w-[24px] mr-[16px] -icon-white"
      :src="item.icon"
      alt="Ícone da funcionalidade."
    />
    <span> {{ item.title }}</span>
  </nuxt-link>
</template>

<style scoped>
.active {
  @apply bg-ldsa-white/[0.12] hover:bg-ldsa-white/20;
}
</style>
