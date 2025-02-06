<script setup lang="ts">
import { createApiListContextOptions } from '~/components/UI/API/List/Context/UIApiListContext';
import CursosForm from './Form/Form.vue';

const { crudModule } = useLadesaApiCrudCursos();

const options = createApiListContextOptions({ crudModule });
</script>

<template>
  <UIAPIList :options="options">
    <template #options-actions>
      <DialogModalEditOrCreateModal :form-component="CursosForm" />
    </template>

    <template #grid-item="{ item, isLoading }">
      <SectionCursosGridItem :item="item" :is-loading="isLoading" />
    </template>

    <template #grid-item-skeleton>
      <SectionCursosGridItem :item="null" :is-loading="true" />
    </template>
  </UIAPIList>
</template>
