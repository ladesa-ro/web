<script lang="ts" setup>
import TurmasForm from './Form/Form.vue';
import type { IEntityListModule } from '~/components/UI/API/List/Context/UIApiListContext';
import { turmaFindAll, turmaFindById } from '@ladesa-ro/web.api.client';

const api = useApiClient();

const crudModule = {
  baseQueryKeys: ['turmas'] as string[],
  list: (data?: any) => api.call(turmaFindAll, { query: data }),
  getOne: (id: string) => api.call(turmaFindById, { path: { id } }),
} satisfies IEntityListModule;

const options = { crudModule };
</script>

<template>
  <UIAPIList :options="options">
    <template #header>
      <UIBreadcrumbDapeBreadcrumb />
    </template>

    <template #options-actions>
      <DialogModalEditOrCreateModal :form-component="TurmasForm" />
    </template>

    <template #grid-item="{ item, isLoading }">
      <SectionTurmasGridItem :is-loading="isLoading" :item="item" />
    </template>

    <template #grid-item-skeleton>
      <SectionTurmasGridItem :is-loading="true" :item="null" />
    </template>
  </UIAPIList>
</template>
