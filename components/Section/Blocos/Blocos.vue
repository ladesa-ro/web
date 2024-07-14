<script setup lang="ts">
import type { BlocoListData } from '@ladesa-ro/api-client-fetch';
import type { ICreateUIApiListContextOptions } from '../../UI/API/List/Context/UIApiListContext';

const apiClient = useApiClient();

const apiBaseResourceListRetriever = (data: BlocoListData) => {
  return apiClient.blocos.blocoList(data);
};

const options = {
  baseQueryKey: ['blocos'],
  apiBaseResourceListRetriever,
} satisfies ICreateUIApiListContextOptions;
</script>

<template>
  <UIAPIList :options="options">
    <template #options-actions>
      <SectionBlocosModal />
    </template>

    <template #grid-item="{ item, isLoading }">
      <SectionBlocosGridItem :bloco="item" :isLoading="isLoading" />
    </template>
  </UIAPIList>
</template>
