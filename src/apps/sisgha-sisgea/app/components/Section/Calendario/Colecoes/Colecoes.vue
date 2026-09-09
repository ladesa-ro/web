<script lang="ts" setup>
import { calendarioColecaoFindAll } from '@ladesa-ro/web.api.client';
import type { IEntityListModule } from '~/components/UI/API/List/Context/UIApiListContext';
import EntityListPage from '../../-Shared/EntityListPage.vue';
import ColecoesForm from './Form/Form.vue';
import ColecoesGridItem from './Grid/Item/Item.vue';

const api = useApiClient();

const crudModule = {
  baseQueryKeys: ['calendario-colecoes'] as string[],
  list: (data?: any) => api.call(calendarioColecaoFindAll, { query: data }),
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
</script>

<template>
  <EntityListPage
    :crud-module="crudModule"
    :form-component="ColecoesForm"
    :grid-item-component="ColecoesGridItem"
    :filter="filter"
    show-breadcrumb
    filtered-by-campus
  >
    <template #filters>
      <div class="u-flex u-flex-wrap u-gap-3 u-items-end">
        <div class="colecoes-filter-visibilidade u-flex-1">
          <UIFormOptionFieldsSelect
            v-model="selectedVisibilidade"
            label="Visibilidade"
            placeholder="Todas"
            :items="visibilidadeItems"
          />
        </div>
      </div>
    </template>
  </EntityListPage>
</template>

<style scoped>
.colecoes-filter-visibilidade {
  min-width: 14rem;
}
</style>
