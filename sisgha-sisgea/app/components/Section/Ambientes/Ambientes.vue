<script lang="ts" setup>
import AmbientesForm from '~/components/Section/Ambientes/Form/Form.vue';
import { createApiListContextOptions } from '~~/app/components/UI/API/List/Context/UIApiListContext';

const { crudModule } = useLadesaApiCrudAmbientes();

const options = createApiListContextOptions({ crudModule });
</script>

<template>
  <UIAPIList :options="options">
    <template #options-actions>
      <DialogModalEditOrCreateModal :form-component="AmbientesForm" />
    </template>

    <template #grid-item="{ item, isLoading }">
      <SectionAmbientesGridItem :is-loading="isLoading" :item="item" />
    </template>

    <template #grid-item-skeleton>
      <SectionAmbientesGridItem :is-loading="true" :item="null" />
    </template>
  </UIAPIList>
</template>
