<script setup lang="ts">
import { computed } from 'vue';
import {
  FormAutocomplete,
  type FormAutocompleteProps,
} from '@ladesa-ro/web.ui';

const { error } = defineProps<
  FormAutocompleteProps & {
    error?: string | null;
    onBlur?: () => void;
    disabled?: boolean;
  }
>();

const selectedOption = defineModel<string | number | null>('selectedOption', {
  required: false,
  default: null,
});

const search = defineModel<string | null>('searchTerm', {
  required: false,
  default: null,
});

const customError = computed(() =>
  error?.includes('ambientePadraoAula.id')
    ? 'Sala de aula é obrigatória!'
    : error
);
</script>

<template>
  <FormAutocomplete
    v-model:selected-option="selectedOption"
    v-model:search-term="search"
    :items="items"
    :label="label"
    :placeholder="placeholder"
    :disabled="disabled"
    :error="customError"
    :on-blur="onBlur"
  />
</template>
