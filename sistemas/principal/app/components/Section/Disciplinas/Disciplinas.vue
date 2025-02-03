<script setup lang="ts">
import { createApiListContextOptions } from '~~/app/components/UI/API/List/Context/UIApiListContext';
import {
  disciplinasBaseQueryKey,
  useDisciplinasRetriever,
} from '~~/app/integrations/api';
import DisciplinasForm from './Form/Form.vue';

const disciplinasRetriever = useDisciplinasRetriever();

const options = createApiListContextOptions({
  baseQueryKey: disciplinasBaseQueryKey,
  apiBaseResourceListRetriever: disciplinasRetriever,
});
</script>

<template>
  <UIAPIList :options="options">
    <template #options-actions>
      <DialogModalEditOrCreateModal :form-component="DisciplinasForm" />
    </template>

    <template #grid-item="{ item, isLoading }">
      <SectionDisciplinasGridItem :item="item" :is-loading="isLoading" />
    </template>

    <template #grid-item-skeleton>
      <SectionDisciplinasGridItem :item="null" :is-loading="true" />
    </template>
  </UIAPIList>
</template>
