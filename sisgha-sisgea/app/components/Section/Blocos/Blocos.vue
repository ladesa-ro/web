<script lang="ts" setup>
import BlocosForm from '~/components/Section/Blocos/Form/Form.vue';
import { createApiListContextOptions } from '~~/app/components/UI/API/List/Context/UIApiListContext';

const { crudModule } = useLadesaApiCrudBlocos();

const options = createApiListContextOptions({ crudModule });
</script>

<template>
  <UIAPIList :options="options">
    <template #options-actions>
      <DialogModalEditOrCreateModal :form-component="BlocosForm" />
    </template>

    <template #grid-item="{ item, isLoading }">
      <SectionBlocosGridItem :is-loading="isLoading" :item="item" />
    </template>

    <template #grid-item-skeleton>
      <SectionBlocosGridItem :is-loading="true" :item="null" />
    </template>
  </UIAPIList>
</template>
