<script setup lang="ts">
import { createApiListContextOptions } from '../../UI/API/List/Context/UIApiListContext';
import { useTurmasRetriever } from './-Helpers/Api';

const turmasRetriever = useTurmasRetriever();

const options = createApiListContextOptions({
  baseQueryKey: ['turmas'],
  apiBaseResourceListRetriever: turmasRetriever,
});
</script>

<template>
  <UIAPIList :options="options">
    <template #options-actions>
      <SectionTurmasModal />
    </template>

    <template #grid-item="{ item, isLoading }">
      <SectionTurmasGridItem :item="item" :isLoading="isLoading" />
    </template>

    <template #grid-item-skeleton>
      <SectionTurmasGridItem :item="null" :isLoading="true" />
    </template>
  </UIAPIList>
</template>
