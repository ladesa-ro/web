<script lang="ts" setup>
import ModalidadesForm from './Form/Form.vue';
import { createApiListContextOptions } from '~/components/UI/API/List/Context/UIApiListContext';

const { crudModule } = useLadesaApiCrudModalidades();

const options = createApiListContextOptions({ crudModule });
</script>

<template>
  <UIAPIList :options="options">
    <template #options-actions>
      <DialogModalEditOrCreateModal :form-component="ModalidadesForm" />
    </template>

    <template #grid-item="{ item, isLoading }">
      <SectionModalidadesGridItem :is-loading="isLoading" :item="item" />
    </template>

    <template #grid-item-skeleton>
      <SectionModalidadesGridItem :is-loading="true" :item="null" />
    </template>
  </UIAPIList>
</template>
