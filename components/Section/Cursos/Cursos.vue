<script setup lang="ts">
import type { CursoListData } from '@ladesa-ro/api-client-fetch';
import type { ICreateUIApiListContextOptions } from '../../UI/API/List/Context/UIApiListContext';

const apiClient = useApiClient();

const apiBaseResourceListRetriever = (data: CursoListData) => {
  return apiClient.cursos.cursoList(data);
};

const options = {
  baseQueryKey: ['cursos'],
  apiBaseResourceListRetriever,
} satisfies ICreateUIApiListContextOptions;
</script>

<template>
  <UIAPIList :options="options">
    <template #options-actions>
      <SectionCursosModal />
    </template>

    <template #grid-item="{ item, isLoading }">
      <SectionCursosGridItem :curso="item" :isLoading="isLoading" />
    </template>
  </UIAPIList>
</template>
