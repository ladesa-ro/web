<script setup lang="ts">
import { createApiListContextOptions } from '~~/app/components/UI/API/List/Context/UIApiListContext';
import {
  ambientesBaseQueryKey,
  useAmbientesRetriever,
} from '../../../integrations/api/modules/useAmbientesRetriever';
import AmbientesForm from '~/components/Section/Ambientes/Form/Form.vue';

const { crudModule } = useLadesaApiCrudAmbientes();

const options = createApiListContextOptions({ crudModule });
</script>

<template>
  <UIAPIList :options="options">
    <template #options-actions>
      <DialogModalEditOrCreateModal :form-component="AmbientesForm" />
    </template>

    <template #grid-item="{ item, isLoading }">
      <SectionAmbientesGridItem :item="item" :is-loading="isLoading" />
    </template>

    <template #grid-item-skeleton>
      <SectionAmbientesGridItem :item="null" :is-loading="true" />
    </template>
  </UIAPIList>
</template>
