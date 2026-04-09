<script lang="ts" setup>
import { useAutocompleteEntity } from '../-Base/createAutocompleteComponent';
import { campusFindAll, campusFindById } from '@ladesa-ro/web.api.client';

defineProps<{ isLoading?: boolean; name: string }>();

const { options } = useAutocompleteEntity({
  baseQueryKeys: ['campi'],
  listFn: campusFindAll,
  getOneFn: campusFindById,
  transformer: item => ({ value: item.id, label: item.apelido }),
});
</script>

<template>
  <VVAutocompleteAPI
    :is-loading="isLoading"
    :name="name"
    :options="options"
    label="Campus"
    placeholder="Selecione um campus"
    v-bind="$attrs"
  />
</template>
