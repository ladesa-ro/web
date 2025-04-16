<script lang="ts" setup>
import { useField } from 'vee-validate';
import type { Item } from '~/components/UI/Form/-Utils/inputTypes';

type Props = { name: string; items: Item[] };
const { name, items } = defineProps<Props>();

//

const searchValue = defineModel<string>('search', { default: '' });

//

const { value: modelValue, errorMessage } = useField<string | null>(
  name,
  undefined,
  {
    validateOnValueUpdate: true,
  }
);
</script>

<template>
  <UIFormOptionFieldsAutocomplete
    :items="items"
    v-model:searchTerm="searchValue"
    v-model:selectedOption="modelValue"
    v-bind="$attrs"
  />
</template>
