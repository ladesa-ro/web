<script lang="ts" setup>
import NiveisFormacoesForm from './Form/Form.vue';
import { createApiListContextOptions } from '~/components/UI/API/List/Context/UIApiListContext';

const { crudModule } = useLadesaApiCrudNiveisFormacoes();

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
