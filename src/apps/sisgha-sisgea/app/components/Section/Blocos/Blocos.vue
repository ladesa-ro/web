<script lang="ts" setup>
import BlocosForm from '~/components/Section/Blocos/Form/Form.vue';
import {
  createApiListContextOptions,
  type IEntityListModule,
} from '~~/app/components/UI/API/List/Context/UIApiListContext';
import { blocoFindAll, blocoFindById } from '@ladesa-ro/web.api.client';

const api = useApiClient();

const crudModule = {
  baseQueryKeys: ['blocos'] as string[],
  list: (data?: any) => api.call(blocoFindAll, { query: data }),
  getOne: (id: string) => api.call(blocoFindById, { path: { id } }),
} satisfies IEntityListModule;

const campusContext = useCampusContext();

const campusFilter = computed(() => {
  if (!campusContext.value) return {};
  return { 'filter.campus.id': [campusContext.value] };
});

const options = createApiListContextOptions({
  crudModule,
  filter: campusFilter,
  filteredByCampus: true,
});
</script>

<template>
  <UIAPIList :options="options">
    <template #options-actions>
      <DialogModalEditOrCreateModal :form-component="BlocosForm" />
    </template>

    <template #grid-item="{ item, isLoading }">
      <SectionBlocosGridItem :is-loading="isLoading" :item="item" />
    </template>

    <template #grid-item-skeleton>
      <SectionBlocosGridItem :is-loading="true" :item="null" />
    </template>
  </UIAPIList>
</template>
