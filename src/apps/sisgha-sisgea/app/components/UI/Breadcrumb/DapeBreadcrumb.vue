<script lang="ts" setup>
import { useLayoutsDashboardSisghaDapeSidebarItems } from '~/components/UI/Layouts/Dashboard/Sisgha/Dape/Sidebar/Items/Items';

const { items } = useLayoutsDashboardSisghaDapeSidebarItems();
</script>

<template>
  <UIBreadcrumb :items="items" v-bind="$attrs">
    <slot />
  </UIBreadcrumb>
</template>
