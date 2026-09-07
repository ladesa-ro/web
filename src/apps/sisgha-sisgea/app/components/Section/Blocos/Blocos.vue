<script lang="ts" setup>
import { blocoFindAll } from '@ladesa-ro/web.api.client';
import type { IEntityListModule } from '~/components/UI/API/List/Context/UIApiListContext';
import EntityListPage from '../-Shared/EntityListPage.vue';
import BlocosForm from './Form/Form.vue';
import BlocosGridItem from './Grid/Item/Item.vue';

const api = useApiClient();

const crudModule = {
  baseQueryKeys: ['blocos'] as string[],
  list: (data?: any) => api.call(blocoFindAll, { query: data }),
} satisfies IEntityListModule;

const campusContext = useCampusContext();

const campusFilter = computed(() => {
  if (!campusContext.value) return {};
  return { 'filter.campus.id': [campusContext.value] };
});
</script>

<template>
  <EntityListPage
    :crud-module="crudModule"
    :form-component="BlocosForm"
    :grid-item-component="BlocosGridItem"
    :filter="campusFilter"
    filtered-by-campus
  />
</template>
