<script lang="ts" setup>
import {
  createApiListContextOptions,
  type IEntityListModule,
} from '~~/app/components/UI/API/List/Context/UIApiListContext';
import { usuarioFindAll, usuarioFindById } from '@ladesa-ro/web.api.client';

const api = useApiClient();

const crudModule = {
  baseQueryKeys: ['usuarios'] as string[],
  list: (data?: any) => api.call(usuarioFindAll, { query: data }),
  getOne: (id: string) => api.call(usuarioFindById, { path: { id } }),
} satisfies IEntityListModule;

const options = createApiListContextOptions({
  crudModule,
  gridClass: 'grid grid-cols-[repeat(auto-fill,_minmax(12.5rem,_1fr))] gap-6',
});
</script>

<template>
  <UIAPIList :options="options">
    <template #options-actions>
      <SectionUsuariosModalsForm />
    </template>

    <template #grid-item="{ item, isLoading }">
      <SectionUsuariosGridItem :is-loading="isLoading" :usuario="item" />
    </template>

    <template #grid-item-skeleton>
      <SectionUsuariosGridItem :is-loading="true" />
    </template>
  </UIAPIList>
</template>
