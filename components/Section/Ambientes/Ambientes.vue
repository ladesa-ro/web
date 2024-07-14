<script setup lang="ts">
import type { AmbienteListData } from '@ladesa-ro/api-client-fetch';
import type { ICreateUIApiListContextOptions } from '../../UI/API/List/Context/UIApiListContext';

const apiClient = useApiClient();

const apiBaseResourceListRetriever = (data: AmbienteListData) => {
  return apiClient.ambientes.ambienteList(data);
};

const options = {
  baseQueryKey: ['ambientes'],
  apiBaseResourceListRetriever,
} satisfies ICreateUIApiListContextOptions;
</script>

<template>
  <UIAPIList :options="options">
    <template #options-actions>
      <SectionAmbientesModal />
    </template>

    <template #grid-item="{ item, isLoading }">
      <SectionAmbientesGridItem :ambiente="item" :isLoading="isLoading" />
    </template>
  </UIAPIList>
</template>
