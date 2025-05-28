<script setup lang="ts">
const searchBarValue = ref<string>('');

const selectedToggleItem = ref<'professor' | 'turma' | 'mesclado'>('professor');
</script>

<template>
  <UIContainer variant="large" class="flex flex-col gap-19">
    <SectionHorarioDapeVisualizationVisualizationHeader
      v-model:search-bar="searchBarValue"
      v-model:toggle="selectedToggleItem"
    />

    <SectionUsuariosGrid
      items-link="/sisgha/dape"
      v-show="selectedToggleItem === 'professor'"
      :search-bar-text="searchBarValue"
    />

    <SectionHorarioDapeVisualizationMesclado
      v-show="selectedToggleItem === 'mesclado'"
    />
  </UIContainer>
</template>
