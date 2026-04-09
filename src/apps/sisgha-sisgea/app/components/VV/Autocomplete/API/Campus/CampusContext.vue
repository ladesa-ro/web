<script lang="ts" setup>
import { useAutocompleteEntity } from '../-Base/createAutocompleteComponent';
import { campusFindAll, campusFindById } from '@ladesa-ro/web.api.client';
import { useField } from 'vee-validate';
import { FormMode } from '~/utils/constants';

const props = withDefaults(
  defineProps<{
    name?: string;
    isLoading?: boolean;
    mode?: FormMode;
    functional?: boolean;
  }>(),
  {
    name: 'campus.id',
    functional: true,
  }
);

const campusContext = useCampusContext();

// --- Functional mode: uses vee-validate via VVAutocompleteAPI ---

const { options } = useAutocompleteEntity({
  baseQueryKeys: ['campi'],
  listFn: campusFindAll,
  getOneFn: campusFindById,
  transformer: (item) => ({ value: item.id, label: item.apelido }),
});

const isDisabled = computed(() => {
  if (!props.functional) return true;
  if (props.mode === FormMode.MANAGE) return true;
  if (campusContext.value) return true;
  return false;
});

// Sync campus context value into the vee-validate field
// useField is only called when functional=true (static prop, safe for composable rules)
const fieldValue = props.functional
  ? useField<string | null>(props.name).value
  : ref<string | null>(null);

if (props.functional) {
  watch(
    campusContext,
    (ctx) => {
      if (ctx && props.mode !== FormMode.MANAGE) {
        fieldValue.value = ctx;
      }
    },
    { immediate: true }
  );
}

// --- Non-functional mode: uses UIFormOptionFieldsAutocomplete directly ---

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
  return campusContext.value ?? null;
});
</script>

<template>
  <!-- Functional: bound to vee-validate field -->
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

  <!-- Non-functional: visual indicator only, no vee-validate -->
  <UIFormOptionFieldsAutocomplete
    v-else
    :selected-option="displaySelectedId"
    :items="displayItems"
    :disabled="true"
    label="Campus"
    placeholder="Todos os campi"
    v-bind="$attrs"
  />
</template>
