<script lang="ts" setup>
import { useAutocompleteEntity } from '../-Base/createAutocompleteComponent';
import { blocoFindAll, blocoFindById } from '@ladesa-ro/web.api.client';

defineProps<{ isLoading?: boolean; name: string }>();

const { options } = useAutocompleteEntity({
  baseQueryKeys: ['blocos'],
  listFn: blocoFindAll,
  getOneFn: blocoFindById,
  transformer: item => ({ value: item.id, label: item.nome }),
});
</script>

<template>
  <VVAutocompleteAPI
    :is-loading="isLoading"
    :name="name"
    :options="options"
    label="Bloco"
    placeholder="Selecione um bloco"
    v-bind="$attrs"
  />
</template>
