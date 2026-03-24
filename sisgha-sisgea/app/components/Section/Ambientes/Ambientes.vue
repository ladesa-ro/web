<script lang="ts" setup>
import AmbientesForm from '~/components/Section/Ambientes/Form/Form.vue';
import {
  createApiListContextOptions,
  type IEntityListModule,
} from '~~/app/components/UI/API/List/Context/UIApiListContext';

const api = useApiClient();

const crudModule = {
  baseQueryKeys: ['ambientes'] as string[],
  list: (data?: any) => api.ambientes.ambienteFindAll(data),
  getOne: (id: string) => api.ambientes.ambienteFindById({ id }),
} satisfies IEntityListModule;

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
