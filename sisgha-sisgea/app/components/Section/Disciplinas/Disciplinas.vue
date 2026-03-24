<script lang="ts" setup>
import { createApiListContextOptions } from '~/components/UI/API/List/Context/UIApiListContext';
import DisciplinasForm from './Form/Form.vue';

const api = useApiClient();

const crudModule = {
  baseQueryKeys: ['disciplinas'] as string[],
  list: (data?: any) => api.disciplinas.disciplinaFindAll(data),
  getOne: (id: string) => api.disciplinas.disciplinaFindById({ id }),
} as any;

const options = createApiListContextOptions({ crudModule });
</script>

<template>
  <UIAPIList :options="options">
    <template #options-actions>
      <DialogModalEditOrCreateModal :form-component="DisciplinasForm" />
    </template>

    <template #grid-item="{ item, isLoading }">
      <SectionDisciplinasGridItem :is-loading="isLoading" :item="item" />
    </template>

    <template #grid-item-skeleton>
      <SectionDisciplinasGridItem :is-loading="true" :item="null" />
    </template>
  </UIAPIList>
</template>
