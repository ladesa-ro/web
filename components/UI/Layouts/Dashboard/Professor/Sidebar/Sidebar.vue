<script setup lang="ts">
import { useLayoutsDashboardContext } from '../../Base/context';
import { useLayoutsDashboardProfessorSidebarItems } from './Items/Items';

const { hamburguerActive } = useLayoutsDashboardContext();
const { items } = useLayoutsDashboardProfessorSidebarItems();
</script>

<template>
  <Sidebar :items="items" v-model="hamburguerActive" />
</template>
