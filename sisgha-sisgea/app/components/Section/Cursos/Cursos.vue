<script lang="ts" setup>
import {
  createApiListContextOptions,
  type IEntityListModule,
} from '~~/app/components/UI/API/List/Context/UIApiListContext';

import CursosForm from './Form/Form.vue';

const api = useApiClient();

const crudModule = {
  baseQueryKeys: ['cursos'] as string[],
  list: (data?: any) => api.cursos.cursoFindAll(data),
  getOne: (id: string) => api.cursos.cursoFindById({ id }),
} satisfies IEntityListModule;

const options = createApiListContextOptions({ crudModule });
</script>

<template>
  <UIAPIList :options="options">
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
