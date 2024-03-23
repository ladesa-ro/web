
<script lang="ts" setup>
import { defineProps, toRef } from 'vue';
import { useField, Field } from 'vee-validate';

const props = defineProps({
  value: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    required: true,
  },
});

const name = toRef(props, 'name');

const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta,
} = useField(name.value, undefined, 
  {
    initialValue: props.value,
    validateOnValueUpdate: false,
  }
);
</script>

<template>
  <v-autocomplete
    @input="handleChange"
    @blur="handleBlur"
    :name="name" 
    :id="name"
    label="Autocomplete"
    variant="outlined"
  />
</template>