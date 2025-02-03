<script setup lang="ts">
import { ambientesBaseQueryKey, useAmbientesRetriever } from '~/utils';
import { createApiListContextOptions } from '~~/app/components/UI/API/List/Context/UIApiListContext';

const ambientesRetriever = useAmbientesRetriever();

const options = createApiListContextOptions({
  baseQueryKey: ambientesBaseQueryKey,
  apiBaseResourceListRetriever: ambientesRetriever,
});
</script>

<template>
  <UIAPIList :options="options">
    <template #options-actions>
      <LazySectionAmbientesModal />
    </template>

    <template #grid-item="{ item, isLoading }">
      <SectionAmbientesGridItem :item="item" :is-loading="isLoading" />
    </template>

    <template #grid-item-skeleton>
      <SectionAmbientesGridItem :item="null" :is-loading="true" />
    </template>
  </UIAPIList>
</template>
