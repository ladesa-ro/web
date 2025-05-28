<script setup lang="ts">
const searchBarValue = ref<string>('');

const selectedToggleItem = ref<'professor' | 'turma' | 'mesclado'>('professor');
</script>

<template>
  <UIContainer
    variant="large"
    class="flex flex-col"
    :class="selectedToggleItem !== 'mesclado' ? 'gap-19' : 'gap-6'"
  >
    <!-- header -->
    <SectionHorarioDapeVisualizationVisualizationHeader
      v-model:search-bar="searchBarValue"
      v-model:toggle="selectedToggleItem"
    />

    <!-- content -->

    <SectionUsuariosGrid
      items-link="/sisgha/dape"
      v-show="selectedToggleItem === 'professor'"
      :search-bar-text="searchBarValue"
    />

    <!-- TODO: adicionar listagem de turmas -->

    <KeepAlive>
      <SectionHorarioDapeVisualizationMesclado
        v-if="selectedToggleItem === 'mesclado'"
      />
    </KeepAlive>
  </UIContainer>
</template>
