<script lang="ts" setup>
import { useField } from 'vee-validate';
import { useAutocompleteEntity } from '../-Base/createAutocompleteComponent';
import {
  calendarioColecaoFindAll,
  calendarioColecaoFindOneById,
} from '@ladesa-ro/web.api.client';

const props = defineProps<{
  isLoading?: boolean;
  name: string;
  label?: string;
}>();

const { options } = useAutocompleteEntity({
  baseQueryKeys: ['calendario-colecoes'],
  listFn: calendarioColecaoFindAll,
  getOneFn: calendarioColecaoFindOneById,
  transformer: (item: any) => ({ value: item.id, label: item.nome }),
});

const { value: fieldValue } = useField<string | null>(() => props.name);

const colecoes = useCalendarioColecao();
const selectedColecaoQuery = colecoes.findOne(
  computed(() => fieldValue.value ?? null)
);
const selectedColor = computed(
  () =>
    (selectedColecaoQuery.data.value as { cor?: string | null } | null)?.cor ??
    null
);
</script>

<template>
  <div class="u-flex u-items-center u-gap-2">
    <span
      v-if="selectedColor"
      class="collection-color-dot u-rounded-full u-shrink-0"
      :style="{ backgroundColor: selectedColor }"
    />
    <VVAutocompleteAPI
      :is-loading="isLoading"
      :name="name"
      :options="options"
      :label="label ?? 'Coleção'"
      placeholder="Selecione uma coleção"
      class="u-flex-1"
      v-bind="$attrs"
    />
  </div>
</template>

<style scoped>
.collection-color-dot {
  width: 0.75rem;
  height: 0.75rem;
}
</style>
