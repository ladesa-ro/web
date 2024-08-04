<script setup lang="ts">
import { useLayoutsDashboardContext } from '../../Base/context';
import { useLayoutsDashboardDapeSidebarItems } from './Items/Items';

const { hamburguerActive } = useLayoutsDashboardContext();
const { items } = useLayoutsDashboardDapeSidebarItems();
</script>

<template>
  <Sidebar :items="items" v-model="hamburguerActive" />
</template>
