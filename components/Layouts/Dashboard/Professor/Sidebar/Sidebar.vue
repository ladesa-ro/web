<script setup lang="ts">
import { useLayoutsDashboardProfessorSidebarItems } from '../Items/Items';

const hamburgerActive = defineModel({
  required: true,
  type: Boolean,
});

const {items} = useLayoutsDashboardProfessorSidebarItems()
</script>

<template>
  <Sidebar :items="items" v-model="hamburgerActive" />
</template>
