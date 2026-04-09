<script lang="ts" setup>
import { useAutocompleteEntity } from '../-Base/createAutocompleteComponent';
import { usuarioFindAll, usuarioFindById } from '@ladesa-ro/web.api.client';

defineProps<{ isLoading?: boolean; name: string }>();

const { options } = useAutocompleteEntity({
  baseQueryKeys: ['usuarios', 'professores'],
  listFn: usuarioFindAll,
  getOneFn: usuarioFindById,
  transformer: (item: any) => ({
    value: item.id,
    label: item.matricula ? `${item.nome} (${item.matricula})` : item.nome,
  }),
  listAdapter: (api, data) =>
    api.call(usuarioFindAll, {
      query: {
        ...data,
        'filter.vinculos.cargo.nome': 'professor',
      },
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
