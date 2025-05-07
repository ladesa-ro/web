<script setup lang="ts">
const searchBarValue = ref<string>('');

const selectedToggleItem = ref<'professor' | 'turma' | 'mesclado'>('professor');
</script>

<template>
  <UIContainer variant="large" class="flex flex-col gap-6">
    <SectionHorarioDapeVisualizationVisualizationHeader
      v-model:search-bar="searchBarValue"
      v-model:toggle="selectedToggleItem"
    />

    <!-- TODO: colocar conteúdo das visualizações -->
  </UIContainer>
</template>
