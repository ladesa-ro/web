<script lang="ts" setup>
import { campusFindAll } from '@ladesa-ro/web.api.client';
import type { IEntityListModule } from '~/components/UI/API/List/Context/UIApiListContext';
import EntityListPage from '../-Shared/EntityListPage.vue';
import CampusForm from './Form/Form.vue';
import CampusGridItem from './Grid/Item/Item.vue';

const api = useApiClient();

const crudModule = {
  baseQueryKeys: ['campi'] as string[],
  list: (data?: any) => api.call(campusFindAll, { query: data }),
} satisfies IEntityListModule;
</script>

<template>
  <EntityListPage
    :crud-module="crudModule"
    :form-component="CampusForm"
    :grid-item-component="CampusGridItem"
  />
</template>
