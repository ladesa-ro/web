<script setup lang="ts">
import { useLayoutsDashboardContext } from '../../../Base/context';
import { useLayoutsDashboardSisgeaCommonSidebarItems } from './Items/Items';

const { hamburguerActive } = useLayoutsDashboardContext();
const { items } = useLayoutsDashboardSisgeaCommonSidebarItems();
</script>

<template>
  <Sidebar :items="items" v-model="hamburguerActive" />
</template>
