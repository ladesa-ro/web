<script lang="ts" setup>
import { createUIAutocompleteApiRetrieverOptions } from '../-Base';
import {
  ofertaFormacaoFindAll,
  ofertaFormacaoFindById,
} from '@ladesa-ro/web.api.client';

type Props = {
  isLoading?: boolean;
  required?: boolean;
  name: string;
  campusId?: string;
};

const props = defineProps<Props>();
const { name } = toRefs(props);

//

const api = useApiClient();
const crudModule = {
  baseQueryKeys: computed(() => ['ofertas-formacoes', props.campusId ?? '']),
  list: (data: any) =>
    api.call(ofertaFormacaoFindAll, {
      query: {
        ...data,
        ...(props.campusId ? { 'filter.campus.id': [props.campusId] } : {}),
      },
    }),
  getOne: (id: string) => api.call(ofertaFormacaoFindById, { path: { id } }),
};

const options = createUIAutocompleteApiRetrieverOptions({
  crudModule,

  transformer: item => ({
    value: item.id,
    label: item.nome,
  }),
});
</script>

<template>
  <VVAutocompleteAPI
    :is-loading="isLoading"
    :name="name"
    :options="options"
    label="Formação"
    placeholder="Selecione uma formação"
    v-bind="$attrs"
    :required="required"
  />
</template>
