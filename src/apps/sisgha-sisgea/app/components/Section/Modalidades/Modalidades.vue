<script lang="ts" setup>
import ModalidadesForm from './Form/Form.vue';

import {
  createApiListContextOptions,
  type IEntityListModule,
} from '~~/app/components/UI/API/List/Context/UIApiListContext';
import {
  modalidadeFindAll,
  modalidadeFindById,
} from '@ladesa-ro/web.api.client';

const api = useApiClient();

const crudModule = {
  baseQueryKeys: ['modalidades'] as string[],
  list: (data?: any) => api.call(modalidadeFindAll, { query: data }),
  getOne: (id: string) => api.call(modalidadeFindById, { path: { id } }),
} satisfies IEntityListModule;

const options = createApiListContextOptions({ crudModule });
</script>

<template>
  <UIAPIList :options="options">
    <template #header>
      <UIBreadcrumbDapeBreadcrumb />
    </template>

    <template #options-actions>
      <DialogModalEditOrCreateModal :form-component="ModalidadesForm" />
    </template>

    <template #grid-item="{ item, isLoading }">
      <SectionModalidadesGridItem :is-loading="isLoading" :item="item" />
    </template>

    <template #grid-item-skeleton>
      <SectionModalidadesGridItem :is-loading="true" :item="null" />
    </template>
  </UIAPIList>
</template>
