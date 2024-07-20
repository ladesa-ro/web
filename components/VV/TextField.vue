<script lang="ts" setup>
import { useField } from 'vee-validate';
import { toRef } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: 'text',
  },
  value: {
    type: String,
    default: undefined,
  },
  name: {
    type: String,
    required: true,
  },
  successMessage: {
    type: String,
    default: '',
  },
});

const name = toRef(props, 'name');

const {
  errorMessage,
  handleBlur,
  value: modelValue,

  handleChange,
} = useField(name, undefined, {
  initialValue: props.value ?? undefined,
  validateOnValueUpdate: false,
});
</script>

<template>
  <UITextFieldBase
    v-bind="$attrs"
    :name="name"
    :type="type"
    :error-messages="errorMessage ? [errorMessage] : []"
    v-model:value="modelValue"
    @blur="handleBlur"
    persistent-hint
  />
</template>

<style>
.help-message {
  color: #f44336;
  font-size: 12px;
  font-weight: 500;
  text-align: start;
  margin-top: 2px;
}
</style>
