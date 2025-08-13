<script lang="ts" setup>
import type { ISidebarItemLink } from './ISidebarItem';

type Props = { item: ISidebarItemLink };
const { item } = defineProps<Props>();

const pointerdownHandle = () => useRouter().push(item.to);
</script>

<template>
  <nuxt-link
    @click.prevent
    @pointerdown="pointerdownHandle"
    :key="item.title"
    :active-class="item.exact ? '' : 'active'"
    :to="item.to"
    exact-active-class="active"
  >
    <SidebarSidebarItemTemplate :item />
  </nuxt-link>
</template>

<style scoped>
@reference "~/assets/styles/app.css";

.active {
  @apply bg-ldsa-white/[0.12] hover:bg-ldsa-white/[0.16];
}
</style>
