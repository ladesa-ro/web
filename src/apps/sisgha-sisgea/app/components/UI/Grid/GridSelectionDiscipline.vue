<script generic="T" lang="ts" setup>
import { GridSelectionDiscipline } from '@ladesa-ro/web.ui';

defineProps<{ items: T[] }>();
defineSlots<{
  item(props: { item: T }): any;
}>();
</script>

<template>
  <GridSelectionDiscipline v-bind="$props">
    <template #item="slotProps">
      <slot name="item" v-bind="slotProps" />
    </template>
  </GridSelectionDiscipline>
</template>
