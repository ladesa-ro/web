<script lang="ts" setup>
import { useLayoutsDashboardContext } from '../../../Base/context';
import { useLayoutsDashboardSisghaAlunoSidebarItems } from './Items/Items';

const { hamburguerActive } = useLayoutsDashboardContext();
const { items } = useLayoutsDashboardSisghaAlunoSidebarItems();
</script>

<template>
  <Sidebar v-model="hamburguerActive" :items="items" />
</template>
