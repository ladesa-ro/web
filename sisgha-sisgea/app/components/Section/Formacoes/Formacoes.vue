<script lang="ts" setup>
import { createApiListContextOptions } from '~/components/UI/API/List/Context/UIApiListContext';
import FormacoesForm from './Form/Form.vue';

const { crudModule } = useLadesaApiCrudOfertasFormacoes();

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
