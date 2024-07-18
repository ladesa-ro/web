<script setup lang="ts">
import { createApiListContextOptions } from '../../UI/API/List/Context/UIApiListContext';
import { useCursosRetriever } from './-Helpers/Api';

const cursosRetriever = useCursosRetriever();

const options = createApiListContextOptions({
  baseQueryKey: ['cursos'],
  apiBaseResourceListRetriever: cursosRetriever,
});
</script>

<template>
  <UIAPIList :options="options">
    <template #options-actions>
      <SectionCursosModal />
    </template>

    <template #grid-item="{ item, isLoading }">
      <SectionCursosGridItem :item="item" :isLoading="isLoading" />
    </template>

    <template #grid-item-skeleton>
      <SectionCursosGridItem :item="null" :isLoading="true" />
    </template>
  </UIAPIList>
</template>
