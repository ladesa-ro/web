<script lang="ts" setup>
import { ambienteFindAll } from '@ladesa-ro/web.api.client';
import type { IEntityListModule } from '~/components/UI/API/List/Context/UIApiListContext';
import EntityListPage from '../-Shared/EntityListPage.vue';
import AmbientesForm from './Form/Form.vue';
import AmbientesGridItem from './Grid/Item/Item.vue';

const api = useApiClient();

const crudModule = {
  baseQueryKeys: ['ambientes'] as string[],
  list: (data?: any) => api.call(ambienteFindAll, { query: data }),
} satisfies IEntityListModule;

const campusContext = useCampusContext();

const campusFilter = computed(() => {
  if (!campusContext.value) return {};
  return { 'filter.bloco.campus.id': [campusContext.value] };
});
</script>

<template>
  <EntityListPage
    :crud-module="crudModule"
    :form-component="AmbientesForm"
    :grid-item-component="AmbientesGridItem"
    :filter="campusFilter"
    filtered-by-campus
  />
</template>
