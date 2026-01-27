<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';

const searchBarValue = ref<string>('');

const selectedToggleItem = ref<'professor' | 'turma' | 'mesclado'>('professor');

const filter = computed(() => ({ search: searchBarValue.value }));

// filter only Turmas searched by user
const { data: turmas, isLoading, isError } = useQuery(listTurmas(filter));

const turmasFilters = ref({});
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
      <template v-if="turmas?.data">
        <SectionTurmasGridItem
          v-for="turma in turmas.data"
          class="ui-api-list-results-grid-item"
          :is-loading="isLoading"
          :item="turma"
          link="horario/turma"
        />
      </template>

      <template v-else-if="isError">
        Ocorreu um erro ao buscar as turmas.
      </template>
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
