<script setup lang="ts">
import { createApiListContextOptions } from '~/components/UI/API/List/Context/UIApiListContext';
import { turmasBaseQueryKey, useTurmasRetriever } from '~/integrations/api';

const turmasRetriever = useTurmasRetriever();

const options = createApiListContextOptions({
  baseQueryKey: turmasBaseQueryKey,
  apiBaseResourceListRetriever: turmasRetriever,
});
</script>

<template>
  <UIAPIList :options="options">
    <template #options-actions>
      <LazySectionTurmasModal />
    </template>

    <template #grid-item="{ item, isLoading }">
      <SectionTurmasGridItem :item="item" :isLoading="isLoading" />
    </template>

    <template #grid-item-skeleton>
      <SectionTurmasGridItem :item="null" :isLoading="true" />
    </template>
  </UIAPIList>
</template>
