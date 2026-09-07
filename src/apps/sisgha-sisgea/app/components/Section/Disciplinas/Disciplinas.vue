<script lang="ts" setup>
import { disciplinaFindAll } from '@ladesa-ro/web.api.client';
import type { IEntityListModule } from '~/components/UI/API/List/Context/UIApiListContext';
import EntityListPage from '../-Shared/EntityListPage.vue';
import DisciplinasForm from './Form/Form.vue';
import DisciplinasGridItem from './Grid/Item/Item.vue';

const api = useApiClient();

const crudModule = {
  baseQueryKeys: ['disciplinas'] as string[],
  list: (data?: any) => api.call(disciplinaFindAll, { query: data }),
} satisfies IEntityListModule;
</script>

<template>
  <EntityListPage
    :crud-module="crudModule"
    :form-component="DisciplinasForm"
    :grid-item-component="DisciplinasGridItem"
    show-breadcrumb
  />
</template>
