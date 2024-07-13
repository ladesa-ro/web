<script setup lang="ts">
import {
  UIApiListViewMode,
  useUIApiListContext,
} from '../Context/UIApiListContext';

const { viewMode } = useUIApiListContext();
</script>
<template>
  <template v-if="viewMode === UIApiListViewMode.CARDS">
    <UIAPIListResultsGrid />
  </template>

  <template v-else>
    <p>Modo de visualização não suportado.</p>
  </template>
</template>
