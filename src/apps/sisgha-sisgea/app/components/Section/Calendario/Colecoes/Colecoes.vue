<script lang="ts" setup>
import ColecoesForm from './Form/Form.vue';
import {
  createApiListContextOptions,
  type IEntityListModule,
} from '~~/app/components/UI/API/List/Context/UIApiListContext';
import {
  calendarioColecaoFindAll,
  calendarioColecaoFindOneById,
} from '@ladesa-ro/web.api.client';

const api = useApiClient();

const crudModule = {
  baseQueryKeys: ['calendario-colecoes'] as string[],
  list: (data?: any) => api.call(calendarioColecaoFindAll, { query: data }),
  getOne: (id: string) => api.call(calendarioColecaoFindOneById, { path: { id } }),
} satisfies IEntityListModule;

const campusContext = useCampusContext();

const selectedVisibilidade = ref<{ label: string; value: string } | undefined>(
  undefined
);

const visibilidadeItems = [
  { label: 'Privada', value: 'PRIVADA' },
  { label: 'Campus', value: 'CAMPUS' },
  { label: 'Pública', value: 'PUBLICA' },
];

const filter = computed(() => {
  const f: Record<string, unknown> = {};
  if (campusContext.value) {
    f['filter.campus.id'] = [campusContext.value];
  }
  if (selectedVisibilidade.value) {
    f['filter.visibilidade'] = [selectedVisibilidade.value.value];
  }
  return f;
});

const options = createApiListContextOptions({
  crudModule,
  filter,
  filteredByCampus: true,
});
</script>

<template>
  <UIAPIList :options="options">
    <template #header>
      <UIBreadcrumbDapeBreadcrumb />
    </template>

    <template #options-actions>
      <DialogModalEditOrCreateModal :form-component="ColecoesForm" />
    </template>

    <template #filters>
      <div class="flex flex-wrap gap-3 items-end">
        <div class="min-w-56 flex-1">
          <UIFormOptionFieldsSelect
            v-model="selectedVisibilidade"
            label="Visibilidade"
            placeholder="Todas"
            :items="visibilidadeItems"
          />
        </div>
      </div>
    </template>

    <template #grid-item="{ item, isLoading }">
      <SectionCalendarioColecoesGridItem :is-loading="isLoading" :item="item" />
    </template>

    <template #grid-item-skeleton>
      <SectionCalendarioColecoesGridItem :is-loading="true" :item="null" />
    </template>
  </UIAPIList>
</template>
