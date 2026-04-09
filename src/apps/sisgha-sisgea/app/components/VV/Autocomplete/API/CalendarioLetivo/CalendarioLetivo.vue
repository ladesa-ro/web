<script lang="ts" setup>
import { useAutocompleteEntity } from '../-Base/createAutocompleteComponent';
import {
  calendarioLetivoFindAll,
  calendarioLetivoFindById,
} from '@ladesa-ro/web.api.client';

const props = defineProps<{
  isLoading?: boolean;
  name: string;
  filter?: Record<string, any>;
}>();

const { options } = useAutocompleteEntity({
  baseQueryKeys: ['calendarioLetivo'],
  listFn: calendarioLetivoFindAll,
  getOneFn: calendarioLetivoFindById,
  transformer: item => ({
    value: item.id,
    label: item.nome || item.slug || `Calendário ${item.id.substring(0, 5)}`,
  }),
});
</script>

<template>
  <VVAutocompleteAPI
    :is-loading="isLoading"
    :name="name"
    :options="options"
    :filter="filter"
    label="Calendário"
    placeholder="Selecione um calendário"
    v-bind="$attrs"
  />
</template>
