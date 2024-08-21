<script setup lang="ts">
import { useLayoutsDashboardContext } from '../../../Base/context';
import { useLayoutsDashboardSisghaDapeSidebarItems } from './Items/Items';

const { hamburguerActive } = useLayoutsDashboardContext();
const { items } = useLayoutsDashboardSisghaDapeSidebarItems();
</script>

<template>
  <Sidebar :items="items" v-model="hamburguerActive" />
</template>
