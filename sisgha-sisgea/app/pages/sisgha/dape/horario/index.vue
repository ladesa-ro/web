<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { filterTurmaResultsBySearch } from '~/components/Section/Horario/Dape/GeneralVisualization/filterTurmaResults';

const searchBarValue = ref<string>('');

const selectedToggleItem = ref<'professor' | 'turma' | 'mesclado'>('professor');

// filter only Turmas searched by user
const { data: turmasCompleteList, isLoading } = useQuery(listTurmas());

const filteredTurmas = filterTurmaResultsBySearch(
  turmasCompleteList,
  searchBarValue
);

const turmasFilters = ref({});

//
</script>

<template>
  <UIContainer
    variant="large"
    class="flex flex-col"
    :class="selectedToggleItem !== 'mesclado' ? 'gap-[3.06rem]' : 'gap-6'"
  >
    <!-- header -->
    <SectionHorarioDapeGeneralVisualizationHeader
      v-model:search-bar="searchBarValue"
      v-model:toggle="selectedToggleItem"
      v-model:turmas-filters="turmasFilters"
    />

    <!-- content -->

    <SectionUsuariosGrid
      items-link="horario/professor"
      v-show="selectedToggleItem === 'professor'"
      :search-bar-text="searchBarValue"
    />

    <div
      v-show="selectedToggleItem === 'turma'"
      class="ui-api-list-results-grid"
    >
      <SectionTurmasGridItem
        v-for="turma in filteredTurmas"
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

    <SectionHorarioDapeGenerateModal
      :selected-toggle-item="selectedToggleItem"
    />
  </UIContainer>
</template>

<style scoped src="~/components/UI/API/List/Results/Grid/Grid.css"></style>
