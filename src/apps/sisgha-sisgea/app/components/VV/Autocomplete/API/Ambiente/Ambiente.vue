<script lang="ts" setup>
import { useAutocompleteEntity } from '../-Base/createAutocompleteComponent';
import { ambienteFindAll, ambienteFindById } from '@ladesa-ro/web.api.client';

const props = defineProps<{
  isLoading?: boolean;
  name: string;
  campusId?: string;
}>();

const { options } = useAutocompleteEntity({
  baseQueryKeys: computed(() => ['ambientes', props.campusId ?? '']),
  listFn: ambienteFindAll,
  getOneFn: ambienteFindById,
  transformer: item => ({ value: item.id, label: item.nome }),
  listAdapter: (api, data) =>
    api.call(ambienteFindAll, {
      query: {
        ...data,
        ...(props.campusId ? { 'filter.bloco.campus.id': [props.campusId] } : {}),
      },
    }),
});
</script>

<template>
  <VVAutocompleteAPI
    :is-loading="isLoading"
    :name="name"
    :options="options"
    label="Ambiente"
    placeholder="Selecione um ambiente"
    v-bind="$attrs"
  />
</template>
