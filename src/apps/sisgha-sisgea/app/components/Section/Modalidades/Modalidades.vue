<script lang="ts" setup>
import { modalidadeFindAll } from '@ladesa-ro/web.api.client';
import type { IEntityListModule } from '~/components/UI/API/List/Context/UIApiListContext';
import EntityListPage from '../-Shared/EntityListPage.vue';
import ModalidadesForm from './Form/Form.vue';
import ModalidadesGridItem from './Grid/Item/Item.vue';

const api = useApiClient();

const crudModule = {
  baseQueryKeys: ['modalidades'] as string[],
  list: (data?: any) => api.call(modalidadeFindAll, { query: data }),
} satisfies IEntityListModule;
</script>

<template>
  <EntityListPage
    :crud-module="crudModule"
    :form-component="ModalidadesForm"
    :grid-item-component="ModalidadesGridItem"
    show-breadcrumb
  />
</template>
