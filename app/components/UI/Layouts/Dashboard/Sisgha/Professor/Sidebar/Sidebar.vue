<script setup lang="ts">
import { useLayoutsDashboardContext } from '../../../Base/context';
import { useLayoutsDashboardSisghaProfessorSidebarItems } from './Items/Items';

const { hamburguerActive } = useLayoutsDashboardContext();
const { items } = useLayoutsDashboardSisghaProfessorSidebarItems();
</script>

<template>
  <Sidebar v-model="hamburguerActive" :items="items" />
</template>
