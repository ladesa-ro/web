<script lang="ts" setup>
import { useAutocompleteEntity } from '../-Base/createAutocompleteComponent';
import { usuarioFindAll, usuarioFindById } from '@ladesa-ro/web.api.client';

defineProps<{ isLoading?: boolean; name: string; label?: string }>();

const { options } = useAutocompleteEntity({
  baseQueryKeys: ['usuarios'],
  listFn: usuarioFindAll,
  getOneFn: usuarioFindById,
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
    :label="label ?? 'Usuário'"
    placeholder="Selecione um usuário"
    v-bind="$attrs"
  />
</template>
