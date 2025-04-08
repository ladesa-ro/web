<script setup lang="ts">
import { mergeProps } from 'vue';
import type { FieldMeta, InputTypes } from './InputTypes';
import Autocomplete from './SelectOrAutocomplete/AutocompleteBase.vue';
import Select from './SelectOrAutocomplete/SelectBase.vue';
import TextField from './TextField/TextField.vue';

type Props = InputTypes & FieldMeta;
const props = defineProps<Props>();

const attrs = useAttrs();

const mergedProps = mergeProps(attrs, props) as Record<string, unknown> & Props;

//

  // model used for textfield's and autocomplete's text input
const inputTextValue = defineModel<string>('inputText', {
  required: false,
  default: '',
});

  // model used just for select
const selectItem = defineModel<any>('select', {
  required: false,
});
</script>

<template>
  <TextField
    v-if="mergedProps.type === 'textfield'"
    v-bind="mergedProps"
    v-model="inputTextValue"
  />

  <Select
    v-else-if="mergedProps.type === 'select'"
    v-bind="mergedProps"
    v-model="selectItem"
  />

  <Autocomplete
    v-else-if="mergedProps.type === 'autocomplete'"
    v-bind="mergedProps"
    v-model="inputTextValue"
  />
</template>
