<script setup lang="ts">
import {
  UIApiListViewMode,
  useUIApiListContext,
} from '../Context/UIApiListContext';

const { viewMode } = useUIApiListContext();
</script>
<template>
  <UIAPIListResultsGrid v-if="viewMode === UIApiListViewMode.CARDS" />
</template>
