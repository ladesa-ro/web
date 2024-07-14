<script setup lang="ts">
import type { TurmaListData } from '@ladesa-ro/api-client-fetch';
import type { ICreateUIApiListContextOptions } from '../../UI/API/List/Context/UIApiListContext';

const apiClient = useApiClient();

const apiBaseResourceListRetriever = (data: TurmaListData) => {
  return apiClient.turmas.turmaList(data);
};

const options = {
  baseQueryKey: ['turmas'],
  apiBaseResourceListRetriever,
} satisfies ICreateUIApiListContextOptions;
</script>

<template>
  <UIAPIList :options="options">
    <template #options-actions>
      <SectionTurmasModal />
    </template>

    <template #grid-item="{ item, isLoading }">
      <SectionTurmasGridItem :turma="item" :isLoading="isLoading" />
    </template>

    <template #grid-item-skeleton>
      <SectionTurmasGridItem :turma="null" :isLoading="true" />
    </template>
  </UIAPIList>
</template>
