<script lang="ts" setup>
import { useField } from 'vee-validate';
import type { Item } from '~/composables/useOptionItems';

type Props = { name: string; items: Item[] };
const { name, items } = defineProps<Props>();

const searchValue = defineModel<string>('search', { default: '' });

const {
  value: modelValue,
  errorMessage,
  handleBlur,
} = useField<Array<string | number>>(
  name,
  val => (!val || val.length === 0 ? 'Selecione ao menos uma opção' : true),
  { validateOnValueUpdate: true }
);
</script>

<template>
  <UIFormOptionFieldsAutocompleteMultiple
    v-model:selected-options="modelValue"
    v-model:search-term="searchValue"
    :items="items"
    :error="errorMessage"
    :on-blur="handleBlur"
    v-bind="$attrs"
  />
</template>
