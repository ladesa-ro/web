<script setup lang="ts">
import { createApiListContextOptions } from '~/components/UI/API/List/Context/UIApiListContext';
import {
  disciplinasBaseQueryKey,
  useDisciplinasRetriever,
} from '~/integrations/api';

const disciplinasRetriever = useDisciplinasRetriever();

const options = createApiListContextOptions({
  baseQueryKey: disciplinasBaseQueryKey,
  apiBaseResourceListRetriever: disciplinasRetriever,
});
</script>

<template>
  <UIAPIList :options="options">
    <template #options-actions>
      <SectionDisciplinasModal />
    </template>

    <template #grid-item="{ item, isLoading }">
      <SectionDisciplinasGridItem :item="item" :isLoading="isLoading" />
    </template>

    <template #grid-item-skeleton>
      <SectionDisciplinasGridItem :item="null" :isLoading="true" />
    </template>
  </UIAPIList>
</template>
