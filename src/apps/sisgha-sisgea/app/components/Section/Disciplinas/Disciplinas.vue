<script lang="ts" setup>
import {
  createApiListContextOptions,
  type IEntityListModule,
} from '~~/app/components/UI/API/List/Context/UIApiListContext';
import {
  disciplinaFindAll,
  disciplinaFindById,
} from '@ladesa-ro/web.api.client';

import DisciplinasForm from './Form/Form.vue';

const api = useApiClient();

const crudModule = {
  baseQueryKeys: ['disciplinas'] as string[],
  list: (data?: any) => api.call(disciplinaFindAll, { query: data }),
  getOne: (id: string) => api.call(disciplinaFindById, { path: { id } }),
} satisfies IEntityListModule;

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
