<script setup lang="ts">
import type { DisciplinaListData } from '@ladesa-ro/api-client-fetch';
import type { ICreateUIApiListContextOptions } from '../../UI/API/List/Context/UIApiListContext';

const apiClient = useApiClient();

const retrieveDisciplinas = (data: DisciplinaListData) => {
  return apiClient.disciplinas.disciplinaList(data);
};

const options = {
  baseQueryKey: ['disciplinas'],
  apiBaseResourceListRetriever: retrieveDisciplinas,
} satisfies ICreateUIApiListContextOptions;
</script>

<template>
  <UIAPIList :options="options">
    <template #options-actions>
      <SectionDisciplinasModal />
    </template>

    <template #grid-item="{ item, isLoading }">
      <SectionDisciplinasGridItem :disciplina="item" :isLoading="isLoading" />
    </template>

    <template #grid-item-skeleton>
      <SectionDisciplinasGridItem :disciplina="null" :isLoading="true" />
    </template>
  </UIAPIList>
</template>
