<script setup lang="ts">
import { createApiListContextOptions } from '~/components/UI/API/List/Context/UIApiListContext';

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
      <SectionBlocosGridItem :item="item" :is-loading="isLoading" />
    </template>

    <template #grid-item-skeleton>
      <SectionBlocosGridItem :item="null" :is-loading="true" />
    </template>
  </UIAPIList>
</template>
