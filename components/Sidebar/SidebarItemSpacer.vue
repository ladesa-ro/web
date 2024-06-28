<script setup lang="ts">
import type { ISidebarItem } from './ISidebarItem';

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
}) as { item: ISidebarItem };

const { item } = toRefs(props);
</script>

<template>
  <div v-if="item.type === 'spacer'" class="flex-1"></div>
</template>
