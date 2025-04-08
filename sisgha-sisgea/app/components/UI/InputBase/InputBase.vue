<script setup lang="ts">
import { mergeProps } from 'vue';
import type { CommonProps, SelectOrAutocompleteProps } from './CommonProps';
import Autocomplete from './SelectOrAutocomplete/AutocompleteBase.vue';
import Select from './SelectOrAutocomplete/SelectBase.vue';
import TextField from './TextField/TextField.vue';

//

type Props = CommonProps &
  SelectOrAutocompleteProps & {
    type: 'textfield' | 'select' | 'autocomplete';
  };

const props = defineProps<Props>();

const attrs = useAttrs();

const mergedProps = mergeProps(attrs, props);

//

  // model used for textfield's and autocomplete's text input
const inputValue = defineModel<string>('inputText', {
  required: false,
  default: '',
});

  // model used just for select
const selectItem = defineModel<any>('select', { required: false });
</script>

<template>
  <TextField
    v-if="type === 'textfield' && !options"
    v-bind="mergedProps"
    v-model:inputText="inputValue"
  />

  <Select
    v-if="type === 'select' && options"
    v-bind="mergedProps"
    v-model:select="selectItem"
  />

  <Autocomplete
    v-if="type === 'autocomplete' && options"
    v-bind="mergedProps"
    v-model:inputText="inputValue"
  />
</template>
