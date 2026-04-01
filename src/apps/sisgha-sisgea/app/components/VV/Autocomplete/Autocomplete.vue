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
} = useField<string | null>(
  name,
  val => (!val ? 'Selecione uma opção' : true),
  { validateOnValueUpdate: true }
);
</script>

<template>
  <UIFormOptionFieldsAutocomplete
    v-model:search-term="searchValue"
    v-model:selected-option="modelValue"
    :items="items"
    :error="errorMessage"
    :on-blur="handleBlur"
    v-bind="$attrs"
  />
</template>
