<script generic="T = any" lang="ts" setup>
import { Grid, type GridItemSlotProps } from '@ladesa-ro/web.ui';

defineProps<{
  isLoading?: boolean;
  items?: GridItemSlotProps['item'][] | null;
}>();

defineSlots<{
  item(props: GridItemSlotProps): any;
  'item-skeleton'(): any;
  default(): any;
}>();
</script>

<template>
  <Grid v-bind="$props">
    <template #item="slotProps">
      <slot name="item" v-bind="slotProps" />
    </template>
    <template #item-skeleton>
      <slot name="item-skeleton" />
    </template>
    <slot />
  </Grid>
</template>
