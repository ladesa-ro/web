<script lang="ts" setup>
import { campusFindAll, campusFindById } from '@ladesa-ro/web.api.client';
import { useField } from 'vee-validate';
import { FormMode } from '~/utils/constants';
import { useAutocompleteEntity } from '../-Base/createAutocompleteComponent';

const NotProvided = Symbol('NotProvided');

const props = withDefaults(
  defineProps<{
    name?: string;
    isLoading?: boolean;
    mode?: FormMode;
    functional?: boolean;
    selectedId?: string | null;
  }>(),
  {
    name: 'campus.id',
    functional: true,
  }
);

const selectedId = props.selectedId ?? NotProvided;

const isSelectedIdProvided = computed(
  () => selectedId && selectedId !== NotProvided
);

const campusContext = useCampusContext();

const { options } = useAutocompleteEntity({
  baseQueryKeys: ['campi'],
  listFn: campusFindAll,
  getOneFn: campusFindById,
  transformer: item => ({ value: item.id, label: item.apelido }),
});

const isDisabled = computed(() => {
  if (!props.functional) return true;
  if (props.mode === FormMode.MANAGE) return true;
  if (campusContext.value) return true;
  return false;
});

const fieldValue = props.functional
  ? useField<string | null>(props.name).value
  : ref<string | null>(null);

if (props.functional) {
  watch(
    campusContext,
    ctx => {
      if (ctx && props.mode !== FormMode.MANAGE) {
        fieldValue.value = ctx;
      }
    },
    { immediate: true }
  );
}

const campi = useCampi();
const { data: allCampiData } = campi.list();

const displayItems = computed(() => {
  return (allCampiData.value?.data ?? []).map(
    (c: { id: string; apelido: string }) => ({
      value: c.id,
      label: c.apelido,
    })
  );
});

const displaySelectedId = computed(() => {
  return isSelectedIdProvided.value && selectedId !== NotProvided
    ? selectedId
    : null;
});
</script>

<template>
  <VVAutocompleteAPI
    v-if="functional"
    :is-loading="isLoading"
    :name="name"
    :options="options"
    :disabled="isDisabled"
    label="Campus"
    placeholder="Selecione um campus"
    v-bind="$attrs"
  />

  <UIFormOptionFieldsAutocomplete
    v-else
    :selected-option="displaySelectedId"
    :items="displayItems"
    :disabled="true"
    label="Campus"
    :placeholder="isSelectedIdProvided ? 'Campus' : 'Todos os campi'"
    v-bind="$attrs"
  />
</template>
