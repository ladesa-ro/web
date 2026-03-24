<script lang="ts" setup>
import {
  createApiListContextOptions,
  type IEntityListModule,
} from '~~/app/components/UI/API/List/Context/UIApiListContext';

import FormacoesForm from './Form/Form.vue';

const api = useApiClient();

const crudModule = {
  baseQueryKeys: ['ofertas-formacoes'] as string[],
  list: (data?: any) => api.ofertasFormacoes.ofertaFormacaoFindAll(data),
  getOne: (id: string) => api.ofertasFormacoes.ofertaFormacaoFindById({ id }),
} satisfies IEntityListModule;

const options = createApiListContextOptions({ crudModule });
</script>

<template>
  <UIAPIList :options="options">
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
