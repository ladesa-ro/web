<script lang="ts" setup>
import { useField } from 'vee-validate';
import type { Item } from '~/composables/useOptionItems';

type Props = {
  name: string;
  items: Item[];
  getValue?: (item: any) => string | number;
  buildItem?: (value: string | number) => any;
};

const props = defineProps<Props>();

const searchValue = defineModel<string>('search', { default: '' });

const {
  value: modelValue,
  errorMessage,
  handleBlur,
} = useField<Array<any>>(
  props.name,
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
    :get-value="getValue"
    :build-item="buildItem"
    v-bind="$attrs"
  />
</template>
