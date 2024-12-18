<script setup lang="ts">
import type { ISidebarItem } from './ISidebarItem';

//

type Props = {
  item: ISidebarItem;
};

const props = defineProps<Props>();

//

const { item } = toRefs(props);
</script>

<template>
  <div v-if="item.type === 'spacer'" class="flex-1" />
</template>
