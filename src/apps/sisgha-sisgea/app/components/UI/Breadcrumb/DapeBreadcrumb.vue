<script lang="ts" setup>
import { useLayoutsDashboardSisghaDapeSidebarItems } from '~/components/UI/Layouts/Dashboard/Sisgha/Dape/Sidebar/Items/Items';

const props = withDefaults(
  defineProps<{
    extraSegment?: string | null;
  }>(),
  { extraSegment: null }
);

const { items } = useLayoutsDashboardSisghaDapeSidebarItems();
</script>

<template>
  <UIBreadcrumb
    :items="items"
    :extra-segment="props.extraSegment"
    v-bind="$attrs"
  >
    <slot />
  </UIBreadcrumb>
</template>
