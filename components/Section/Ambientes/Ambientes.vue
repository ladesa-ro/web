<script setup lang="ts">
import { createApiListContextOptions } from '../../UI/API/List/Context/UIApiListContext';
import { useAmbientesRetriever } from './-Helpers/Api';

const ambientesRetriever = useAmbientesRetriever();

const options = createApiListContextOptions({
  baseQueryKey: ['ambientes'],
  apiBaseResourceListRetriever: ambientesRetriever,
});
</script>

<template>
  <UIAPIList :options="options">
    <template #options-actions>
      <SectionAmbientesModal />
    </template>

    <template #grid-item="{ item, isLoading }">
      <SectionAmbientesGridItem :item="item" :isLoading="isLoading" />
    </template>

    <template #grid-item-skeleton>
      <SectionAmbientesGridItem :item="null" :isLoading="true" />
    </template>
  </UIAPIList>
</template>
