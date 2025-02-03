<script setup lang="ts">
import type { CampusFindOneResultView } from '@ladesa-ro/api-client-fetch';
import {
  campiBaseQueryKey,
  useCampiRetriever,
  useCampusGetRetriever,
} from '~~/app/integrations/api';
import { createUIAutocompleteApiRetrieverOptions } from '../-Base';

type Props = {
  isLoading?: boolean;
  name: string;
};
const props = defineProps<Props>();
const { name } = toRefs(props);

//

const campiRetriever = useCampiRetriever();
const campusGetRetriever = useCampusGetRetriever();

const options = createUIAutocompleteApiRetrieverOptions({
  baseQueryKey: campiBaseQueryKey,

  apiResourceGetRetriever: campusGetRetriever,
  apiResourceListRetriever: campiRetriever,

  transformer: (item: CampusFindOneResultView) => ({
    value: item.id,
    label: item.apelido,
  }),
});

//
</script>

<template>
  <VVAutocompleteAPI
    :name="name"
    :options="options"
    :is-loading="isLoading"
    label="Campus"
    placeholder="Selecione um campus"
    v-bind="$attrs"
  />
</template>
