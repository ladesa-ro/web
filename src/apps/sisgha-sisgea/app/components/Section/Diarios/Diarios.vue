<script lang="ts" setup>
import {
  createApiListContextOptions,
  type IEntityListModule,
} from '~~/app/components/UI/API/List/Context/UIApiListContext';
import { diarioFindAll, diarioFindById } from '@ladesa-ro/web.api.client';

const api = useApiClient();

const crudModule = {
  baseQueryKeys: ['diarios'] as string[],
  list: (data?: any) => api.call(diarioFindAll, { query: data }),
  getOne: (id: string) => api.call(diarioFindById, { path: { id } }),
} satisfies IEntityListModule;

const options = createApiListContextOptions({ crudModule });
</script>

<template>
  <UIAPIList :options="options">
    <template #header>
      <UIBreadcrumbDapeBreadcrumb />
    </template>

    <template #options-actions>
      <LazySectionDiariosModal />
    </template>

    <template #grid-item="{ item }">
      <SectionDiariosGridItem :diario="item" />
    </template>

    <template #grid-item-skeleton>
      <SectionDiariosGridItem :diario="null" />
    </template>
  </UIAPIList>
</template>
