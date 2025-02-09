<script setup lang="ts">
import fodase from '~/components/Section/Blocos/Form/Form.vue';
import { createApiListContextOptions } from '~~/app/components/UI/API/List/Context/UIApiListContext';
import { useBlocosRetriever } from '~~/app/integrations/api';

const { crudModule } = useLadesaApiCrudBlocos();

const options = createApiListContextOptions({ crudModule });
</script>

<template>
  <UIAPIList :options="options">
    <template #options-actions>
      <DialogModalEditOrCreateModal :form-component="fodase" />
    </template>

    <template #grid-item="{ item, isLoading }">
      <SectionBlocosGridItem :item="item" :is-loading="isLoading" />
    </template>

    <template #grid-item-skeleton>
      <SectionBlocosGridItem :item="null" :is-loading="true" />
    </template>
  </UIAPIList>
</template>
