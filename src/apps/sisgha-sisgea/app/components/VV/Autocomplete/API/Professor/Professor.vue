<script lang="ts" setup>
import { createUIAutocompleteApiRetrieverOptions } from '../-Base';
import { usuarioFindAll, usuarioFindById } from '@ladesa-ro/web.api.client';

type Props = {
  isLoading?: boolean;
  name: string;
};

defineProps<Props>();

const api = useApiClient();

const crudModule = {
  baseQueryKeys: ['usuarios', 'professores'],
  list: (data: any) =>
    api.call(usuarioFindAll, {
      query: {
        ...data,
        'filter.vinculos.cargo.nome': 'professor',
      },
    }),
  getOne: (id: string) => api.call(usuarioFindById, { path: { id } }),
};

const options = createUIAutocompleteApiRetrieverOptions({
  crudModule,
  transformer: (item: any) => ({
    value: item.id,
    label: item.matricula ? `${item.nome} (${item.matricula})` : item.nome,
  }),
});
</script>

<template>
  <VVAutocompleteAPI
    :is-loading="isLoading"
    :name="name"
    :options="options"
    label="Professor"
    placeholder="Selecione um professor"
    v-bind="$attrs"
  />
</template>
