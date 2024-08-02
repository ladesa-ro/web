<script setup lang="ts">
import { createApiListContextOptions } from '~/components/UI/API/List/Context/UIApiListContext';
import { useBlocosRetriever } from '~/integrations/api';

const blocosRetriever = useBlocosRetriever();

const options = createApiListContextOptions({
  baseQueryKey: ['blocos'],
  apiBaseResourceListRetriever: blocosRetriever,
});
</script>

<template>
  <UIAPIList :options="options">
    <template #options-actions>
      <LazySectionBlocosModal />
    </template>

    <template #grid-item="{ item, isLoading }">
      <SectionBlocosGridItem :item="item" :isLoading="isLoading" />
    </template>

    <template #grid-item-skeleton>
      <SectionBlocosGridItem :item="null" :isLoading="true" />
    </template>
  </UIAPIList>
</template>
