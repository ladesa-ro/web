<script lang="ts" setup>
import { useField } from 'vee-validate';

const props = defineProps<{
  name: string;
  colors?: string[];
  disabled?: boolean;
}>();

const fieldDisabled = useFieldDisabled(() => props.disabled);

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
    :disabled="fieldDisabled"
    :error="errorMessage"
  />
</template>
