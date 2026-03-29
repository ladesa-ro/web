<script lang="ts" setup>
import {
  createApiListContextOptions,
  type IEntityListModule,
} from '~~/app/components/UI/API/List/Context/UIApiListContext';
import { cursoFindAll, cursoFindById } from '@ladesa-ro/web.api.client';

import CursosForm from './Form/Form.vue';

const api = useApiClient();

const crudModule = {
  baseQueryKeys: ['cursos'] as string[],
  list: (data?: any) => api.call(cursoFindAll, { query: data }),
  getOne: (id: string) => api.call(cursoFindById, { path: { id } }),
} satisfies IEntityListModule;

const options = createApiListContextOptions({ crudModule });
</script>

<template>
  <UIAPIList :options="options">
    <template #header>
      <UIBreadcrumbDapeBreadcrumb />
    </template>

    <template #options-actions>
      <DialogModalEditOrCreateModal :form-component="CursosForm" />
    </template>

    <template #grid-item="{ item, isLoading }">
      <SectionCursosGridItem :is-loading="isLoading" :item="item" />
    </template>

    <template #grid-item-skeleton>
      <SectionCursosGridItem :is-loading="true" :item="null" />
    </template>
  </UIAPIList>
</template>
