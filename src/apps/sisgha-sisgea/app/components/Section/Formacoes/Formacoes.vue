<script lang="ts" setup>
import {
  createApiListContextOptions,
  type IEntityListModule,
} from '~~/app/components/UI/API/List/Context/UIApiListContext';
import {
  ofertaFormacaoFindAll,
  ofertaFormacaoFindById,
} from '@ladesa-ro/web.api.client';

import FormacoesForm from './Form/Form.vue';

const api = useApiClient();

const crudModule = {
  baseQueryKeys: ['ofertas-formacoes'] as string[],
  list: (data?: any) => api.call(ofertaFormacaoFindAll, { query: data }),
  getOne: (id: string) => api.call(ofertaFormacaoFindById, { path: { id } }),
} satisfies IEntityListModule;

const campusContext = useCampusContext();

const campusFilter = computed(() => {
  if (!campusContext.value) return {};
  return { 'filter.campus.id': [campusContext.value] };
});

const options = createApiListContextOptions({ crudModule, filter: campusFilter, filteredByCampus: true });
</script>

<template>
  <UIAPIList :options="options">
    <template #header>
      <UIBreadcrumbDapeBreadcrumb />
    </template>

    <template #options-actions>
      <DialogModalEditOrCreateModal :form-component="FormacoesForm" />
    </template>

    <template #grid-item="{ item, isLoading }">
      <SectionFormacoesGridItem :is-loading="isLoading" :item="item" />
    </template>

    <template #grid-item-skeleton>
      <SectionFormacoesGridItem :is-loading="true" :item="null" />
    </template>
  </UIAPIList>
</template>
