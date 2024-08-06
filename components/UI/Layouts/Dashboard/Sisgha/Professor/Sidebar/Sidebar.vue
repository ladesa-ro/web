<script setup lang="ts">
import { useLayoutsDashboardContext } from '../../../Base/context';
import { useLayoutsDashboardSisghaProfessorSidebarItems } from './Items/Items';

const { hamburguerActive } = useLayoutsDashboardContext();
const { items } = useLayoutsDashboardSisghaProfessorSidebarItems();
</script>

<template>
  <Sidebar :items="items" v-model="hamburguerActive" />
</template>
