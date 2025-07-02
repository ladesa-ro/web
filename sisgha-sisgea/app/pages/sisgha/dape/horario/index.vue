<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';

const searchBarValue = ref<string>('');

const selectedToggleItem = ref<'professor' | 'turma' | 'mesclado'>('professor');

const { data: turmas, isLoading, isError } = useQuery(listTurmas());

// if (turmas.value) {
//   turmas.value.data.forEach(turma => {

//   });
// }
</script>

<template>
  <UIContainer
    variant="large"
    class="flex flex-col"
    :class="selectedToggleItem !== 'mesclado' ? 'gap-19' : 'gap-6'"
  >
    <!-- header -->
    <SectionHorarioDapeGeneralVisualizationHeader
      v-model:search-bar="searchBarValue"
      v-model:toggle="selectedToggleItem"
    />

    <!-- content -->

    <SectionUsuariosGrid
      items-link="horario/professor"
      v-show="selectedToggleItem === 'professor'"
      :search-bar-text="searchBarValue"
    />

    <!-- TODO: adicionar listagem de turmas -->
    <div
      v-show="selectedToggleItem === 'turma'"
      class="ui-api-list-results-grid"
    >
      <SectionTurmasGridItem
        v-for="turma in turmas?.data"
        class="ui-api-list-results-grid-item"
        :is-loading="isLoading"
        :item="turma"
        link="horario/turma"
      />
    </div>

    <KeepAlive>
      <SectionHorarioDapeGeneralVisualizationMesclado
        v-if="selectedToggleItem === 'mesclado'"
      />
    </KeepAlive>
  </UIContainer>
</template>

<style scoped src="~/components/UI/API/List/Results/Grid/Grid.css"></style>
