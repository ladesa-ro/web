<script lang="ts" setup>
import CampusForm from './Form/Form.vue';
import {
  createApiListContextOptions,
  type IEntityListModule,
} from '~~/app/components/UI/API/List/Context/UIApiListContext';
import { campusFindAll, campusFindById } from '@ladesa-ro/web.api.client';

const api = useApiClient();

const crudModule = {
  baseQueryKeys: ['campi'] as string[],
  list: (data?: any) => api.call(campusFindAll, { query: data }),
  getOne: (id: string) => api.call(campusFindById, { path: { id } }),
} satisfies IEntityListModule;

const options = createApiListContextOptions({ crudModule });
</script>

<template>
  <UIAPIList :options="options">
    <template #options-actions>
      <DialogModalEditOrCreateModal :form-component="CampusForm" />
    </template>

    <template #grid-item="{ item, isLoading }">
      <SectionCampusGridItem :is-loading="isLoading" :item="item" />
    </template>

    <template #grid-item-skeleton>
      <SectionCampusGridItem :is-loading="true" :item="null" />
    </template>
  </UIAPIList>
</template>
