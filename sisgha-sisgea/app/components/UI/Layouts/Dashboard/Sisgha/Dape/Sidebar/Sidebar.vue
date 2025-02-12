<script lang="ts" setup>
import { useLayoutsDashboardContext } from '../../../Base/context';
import { useLayoutsDashboardSisghaDapeSidebarItems } from './Items/Items';

const { hamburguerActive } = useLayoutsDashboardContext();
const { items } = useLayoutsDashboardSisghaDapeSidebarItems();
</script>

<template>
  <Sidebar v-model="hamburguerActive" :items="items" />
</template>
