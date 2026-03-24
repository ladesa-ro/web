<script lang="ts" setup>
import NiveisFormacoesForm from './Form/Form.vue';

import {
  createApiListContextOptions,
  type IEntityListModule,
} from '~~/app/components/UI/API/List/Context/UIApiListContext';

const api = useApiClient();

const crudModule = {
  baseQueryKeys: ['niveis-formacoes'] as string[],
  list: (data?: any) => api.niveisFormacoes.nivelFormacaoFindAll(data),
  getOne: (id: string) => api.niveisFormacoes.nivelFormacaoFindById({ id }),
} satisfies IEntityListModule;

const options = createApiListContextOptions({ crudModule });
</script>

<template>
  <UIAPIList :options="options">
    <template #options-actions>
      <DialogModalEditOrCreateModal :form-component="NiveisFormacoesForm" />
    </template>

    <template #grid-item="{ item, isLoading }">
      <SectionNiveisFormacoesGridItem :is-loading="isLoading" :item="item" />
    </template>

    <template #grid-item-skeleton>
      <SectionNiveisFormacoesGridItem :is-loading="true" :item="null" />
    </template>
  </UIAPIList>
</template>
