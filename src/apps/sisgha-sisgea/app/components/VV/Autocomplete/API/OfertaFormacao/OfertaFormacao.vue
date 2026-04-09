<script lang="ts" setup>
import { useAutocompleteEntity } from '../-Base/createAutocompleteComponent';
import { ofertaFormacaoFindAll, ofertaFormacaoFindById } from '@ladesa-ro/web.api.client';

const props = defineProps<{
  isLoading?: boolean;
  required?: boolean;
  name: string;
  campusId?: string;
}>();

const { options } = useAutocompleteEntity({
  baseQueryKeys: computed(() => ['ofertas-formacoes', props.campusId ?? '']),
  listFn: ofertaFormacaoFindAll,
  getOneFn: ofertaFormacaoFindById,
  transformer: item => ({ value: item.id, label: item.nome }),
  listAdapter: (api, data) =>
    api.call(ofertaFormacaoFindAll, {
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
    :required="required"
    label="Formação"
    placeholder="Selecione uma formação"
    v-bind="$attrs"
  />
</template>
