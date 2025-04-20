<script lang="ts" setup>
import { useField } from 'vee-validate';

type Props = {
  type?: string;
  value?: string;
  name: string;
  successMessage?: string;
};

const {
  name,
  type = 'text',
  value = undefined,
  successMessage = '',
} = defineProps<Props>();

const {
  errorMessage,
  handleBlur,
  value: modelValue,
} = useField(name, undefined, {
  initialValue: value ?? undefined,
  validateOnValueUpdate: false,
});
</script>

<template>
  <UIFormTextField
    v-model="modelValue"
    :name="name"
    :type="type"
    v-bind="$attrs"
  />
</template>
