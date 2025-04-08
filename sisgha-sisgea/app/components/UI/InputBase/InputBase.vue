<script setup lang="ts">
import type { CommonProps, SelectOrAutocompleteProps } from './CommonProps';
import Autocomplete from './SelectOrAutocomplete/AutocompleteBase.vue';
import Select from './SelectOrAutocomplete/SelectBase.vue';
import TextField from './TextField/TextField.vue';

type Props = CommonProps &
  SelectOrAutocompleteProps & {
    type: 'textfield' | 'select' | 'autocomplete';
  };

const props = defineProps<Props>();

// TODO: adicionar v-model para lidar com o valor de textfield
</script>

<template>
  <TextField v-if="type === 'textfield' && !options" v-bind="props" />

  <Select v-if="type === 'select' && options" v-bind="props" />

  <Autocomplete v-if="type === 'autocomplete' && options" v-bind="props" />
</template>
