<script lang="ts" setup>
import { nivelFormacaoFindAll } from '@ladesa-ro/web.api.client';
import type { IEntityListModule } from '~/components/UI/API/List/Context/UIApiListContext';
import EntityListPage from '../-Shared/EntityListPage.vue';
import NiveisFormacoesForm from './Form/Form.vue';
import NiveisFormacoesGridItem from './Grid/Item/Item.vue';

const api = useApiClient();

const crudModule = {
  baseQueryKeys: ['niveis-formacoes'] as string[],
  list: (data?: any) => api.call(nivelFormacaoFindAll, { query: data }),
} satisfies IEntityListModule;
</script>

<template>
  <EntityListPage
    :crud-module="crudModule"
    :form-component="NiveisFormacoesForm"
    :grid-item-component="NiveisFormacoesGridItem"
    show-breadcrumb
  />
</template>
