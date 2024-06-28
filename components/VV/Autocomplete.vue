<script lang="ts" setup>
import { useField } from 'vee-validate';
import { toRef } from 'vue';

const searchValue = defineModel('search', { default: '' });

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});

const name = toRef(props, 'name');

const {
  handleBlur,
  errorMessage,
  value: modelValue,
} = useField(name.value, undefined, {
  validateOnValueUpdate: true,
});
</script>

<template>
  <div class="autoCompleteField">
    <UIAutocompleteBase
      clearable
      :name="name"
      v-bind="$attrs"
      @blur="handleBlur"
      hide-details="auto"
      persistent-placeholder
      v-model:value="modelValue"
      v-model:search="searchValue"
      :error-messages="errorMessage ? [errorMessage] : []"
    />
  </div>
</template>
