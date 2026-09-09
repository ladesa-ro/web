<script setup lang="ts">
import {
  FormAutocompleteMultiple,
  type FormAutocompleteProps,
} from '@ladesa-ro/web.ui';

defineProps<
  FormAutocompleteProps & {
    error?: string | null;
    onBlur?: () => void;
    disabled?: boolean;
    getValue?: (item: any) => string | number;
    buildItem?: (value: string | number) => any;
  }
>();

const modelValue = defineModel<Array<any>>('selectedOptions', {
  required: false,
  default: () => [],
});

const search = defineModel<string>('searchTerm', {
  required: false,
  default: '',
});
</script>

<template>
  <FormAutocompleteMultiple
    v-model:selected-options="modelValue"
    v-model:search-term="search"
    :items="items"
    :label="label"
    :placeholder="placeholder"
    :disabled="disabled"
    :error="error"
    :on-blur="onBlur"
    :get-value="getValue"
    :build-item="buildItem"
  />
</template>
