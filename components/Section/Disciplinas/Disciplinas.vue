<script setup lang="ts">
import { createApiListContextOptions } from '../../UI/API/List/Context/UIApiListContext';
import { useDisciplinasRetriever } from './-Helpers/Api';

const disciplinasRetriever = useDisciplinasRetriever();

const options = createApiListContextOptions({
  baseQueryKey: ['disciplinas'],
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
