<script lang="ts" setup>
import { useField } from 'vee-validate';

const props = defineProps<{
  name: string;
  colors?: string[];
  disabled?: boolean;
}>();

const {
  value: fieldValue,
  errorMessage,
} = useField<string | null>(
  () => props.name,
  undefined,
  {
    validateOnValueUpdate: false,
  },
);
</script>

<template>
  <UIFormColorPalette
    v-model="fieldValue"
    :colors="colors"
    :disabled="disabled"
    :error="errorMessage"
  />
</template>
