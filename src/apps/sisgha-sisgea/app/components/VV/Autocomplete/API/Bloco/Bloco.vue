<script lang="ts" setup>
import { useAutocompleteEntity } from '../-Base/createAutocompleteComponent';
import { blocoFindAll, blocoFindById } from '@ladesa-ro/web.api.client';

const props = defineProps<{
  isLoading?: boolean;
  name: string;
  campusId?: string;
}>();

const { options } = useAutocompleteEntity({
  baseQueryKeys: computed(() => ['blocos', props.campusId ?? '']),
  listFn: blocoFindAll,
  getOneFn: blocoFindById,
  transformer: item => ({ value: item.id, label: item.nome }),
  listAdapter: (api, data) =>
    api.call(blocoFindAll, {
      query: {
        ...data,
        ...(props.campusId ? { 'filter.campus.id': [props.campusId] } : {}),
      },
    }),
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
