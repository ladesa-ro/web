<script setup lang="ts">
import { createApiListContextOptions } from '~/components/UI/API/List/Context/UIApiListContext';
import DisciplinasForm from './Form/Form.vue';

const { crudModule } = useLadesaApiCrudDisciplinas();

const options = createApiListContextOptions({ crudModule });
</script>

<template>
  <UIAPIList :options="options">
    <template #options-actions>
      <DialogModalEditOrCreateModal :form-component="DisciplinasForm" />
    </template>

    <template #grid-item="{ item, isLoading }">
      <SectionDisciplinasGridItem :item="item" :is-loading="isLoading" />
    </template>

    <template #grid-item-skeleton>
      <SectionDisciplinasGridItem :item="null" :is-loading="true" />
    </template>
  </UIAPIList>
</template>
