<script lang="ts" setup>
import { useAutocompleteEntity } from '../-Base/createAutocompleteComponent';
import {
  modalidadeFindAll,
  modalidadeFindById,
} from '@ladesa-ro/web.api.client';

defineProps<{ isLoading?: boolean; name: string }>();

const { options } = useAutocompleteEntity({
  baseQueryKeys: ['modalidades'],
  listFn: modalidadeFindAll,
  getOneFn: modalidadeFindById,
  transformer: item => ({ value: item.id, label: item.nome }),
});
</script>

<template>
  <VVAutocompleteAPI
    :is-loading="isLoading"
    :name="name"
    :options="options"
    label="Modalidade"
    placeholder="Selecione uma modalidade"
    v-bind="$attrs"
  />
</template>
