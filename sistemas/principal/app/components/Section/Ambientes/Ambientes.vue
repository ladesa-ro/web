<script setup lang="ts">
import { createApiListContextOptions } from '~/components/UI/API/List/Context/UIApiListContext';
import { useLadesaApiCrudAmbientes } from '../../../composables/integrations/ladesa-api/modules/modules';

const { crudModule } = useLadesaApiCrudAmbientes();

const options = createApiListContextOptions({ crudModule });
</script>

<template>
  <UIAPIList :options="options">
    <template #options-actions>
      <LazySectionAmbientesModal />
    </template>

    <template #grid-item="{ item, isLoading }">
      <SectionAmbientesGridItem :item="item" :is-loading="isLoading" />
    </template>

    <template #grid-item-skeleton>
      <SectionAmbientesGridItem :item="null" :is-loading="true" />
    </template>
  </UIAPIList>
</template>
