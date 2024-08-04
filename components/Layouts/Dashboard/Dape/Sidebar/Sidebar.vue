<script setup lang="ts">
import { useLayoutsDashboardDapeSidebarItems } from './Items/Items';

const hamburgerActive = defineModel({
  required: true,
  type: Boolean,
});

const {items} = useLayoutsDashboardDapeSidebarItems()
</script>

<template>
  <Sidebar :items="items" v-model="hamburgerActive" />
</template>
