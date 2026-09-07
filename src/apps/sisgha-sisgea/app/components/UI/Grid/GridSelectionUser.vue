<script generic="T extends { id: string }" lang="ts" setup>
import { GridSelectionUser } from '@ladesa-ro/web.ui';

defineProps<{ items: T[] }>();
defineSlots<{
  item(props: { item: T }): any;
}>();
</script>

<template>
  <GridSelectionUser v-bind="$props">
    <template #item="slotProps">
      <slot name="item" v-bind="slotProps" />
    </template>
  </GridSelectionUser>
</template>
